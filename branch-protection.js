const https = require('https');
const auth = require('./auth');
const crypto = require('crypto');

module.exports = {
  branchProtection: function (app) {
    app.post('/api/github/webhook', (req,res)=>{
      let body = "";
      req.on('data', function (chunk) {
          body += chunk;
      });

      req.on('end', function () {
          const authenticated = auth.checkHash(body, req, res);
          if(authenticated) {
            const jsonObj = JSON.parse(body);

            enableBranchprotection(jsonObj, req, res);

            res.statusCode = 201;
            res.setHeader('content-type', 'application/json');
            res.send('{"status"  "Completed"}');
          }
      })

    });
  }
};

function enableBranchprotection(jsonObj, req, res) {
    if(req.header('x-github-event') == 'create' &&
            jsonObj.ref_type == 'branch' &&
            jsonObj.ref == process.env['BRANCH_TO_PROTECT']){

        const subject = jsonObj.sender.login;
        const ownerRepo = jsonObj.repository.full_name;
        const branchName = jsonObj.ref;
        if(subject != null && ownerRepo != null & branchName != null) {
          barnchProtectionHttpRequest(ownerRepo, branchName);
          issueCreationHttpRequest(subject, ownerRepo);
          return true;
        }
    }
    return false;
}

function barnchProtectionHttpRequest(ownerRepo, branchName) {
  const data = JSON.stringify({
      "required_status_checks": null,
      "enforce_admins": null,
      "required_pull_request_reviews": {
          "dismissal_restrictions": {},
          "dismiss_stale_reviews": false,
          "require_code_owner_reviews": true,
          "required_approving_review_count": 2
      },
      "allow_force_pushes": false,
      "restrictions": null
  });

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/repos/' + ownerRepo + '/branches/'+ branchName  +'/protection',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'PostmanRuntime/7.28.4',
      'Authorization': 'token ' + process.env['GITHUB_PERSONAL_TOKEN']
    }
  };

  const req = https.request(options, res => {
    if(res.statusCode == 200) {
      console.log('Branch protection updated');
    }
  });

  req.on('error', error => {
    console.error(error)
  });

  req.write(data);
  req.end();
}

function issueCreationHttpRequest(subject, ownerRepo) {
  const data = JSON.stringify({
        "title": "Branch Protection Enabled",
        "body": "The main brach has been protected using standard policy @" + subject
  });

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/repos/' + ownerRepo + '/issues',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'PostmanRuntime/7.28.4',
      'Authorization': 'token ' + process.env['GITHUB_PERSONAL_TOKEN']
    }
  };

  const req = https.request(options, res => {
    if(res.statusCode == 201) {
      console.log('Issue created');
    }
  })

  req.on('error', error => {
    console.error(error);
  });

  req.write(data);
  req.end();
}
