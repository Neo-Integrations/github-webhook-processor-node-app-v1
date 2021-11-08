const https = require('https');
const fs = require('fs');
const util = require('util');
const express = require('express');
const crypto = require('crypto');

const interfaces = require('./branch-protection');

require('dotenv').config();

if(process.env['log.file.enable'] == 'yes') {
  const log = fs.createWriteStream(__dirname + '/logs/app.log', {flags : 'a'});
  var stdout = process.stdout;

  console.log = function(d) { //
    log.write(util.format(d) + '\n');
    stdout.write(util.format(d) + '\n');
  };
}


const app = express();
const port = process.env['PORT'];
const privateKeyPassphrase = process.env['KEY_PASS'];

// This line is from the Node.js HTTPS documentation.
const options = {
  key: fs.readFileSync('certs/private.key'),
  cert: fs.readFileSync('certs/cert.pem'),
  passphrase: privateKeyPassphrase
};

https.createServer(options, app).listen(port);
interfaces.branchProtection(app);
