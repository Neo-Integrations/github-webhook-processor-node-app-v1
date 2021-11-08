const crypto = require('crypto');

module.exports = {
  checkHash: function (body, req, res) {
      const sh256HexDigest = 'sha256=' + crypto.createHmac('SHA256', process.env['WEBHOOK_TOKEN']).update(body).digest('hex')
      const receivedHash  = req.header('X-Hub-Signature-256');

      if (sh256HexDigest != receivedHash) {
          res.setHeader('content-type', 'application/json');
          res.statusCode = 403;
          res.send('{"status"  "Authentication issue"}');
          return false;
      }
      return true;
  }
};
