# GitHub Webhook processor NodeJS application

## User Guide
 - Clone the project

 - Change directory to the root of the project and run `npm install` to install all the dependencies

 - Create `.env` file at the root of the project. This file will have all the secrets, so keep it safe. Please note, since the secrets will be in plain text, the better approach will be to pass them as environment variable but for simplicity, I am using `dotenv` util.
  ```
    secret.token={}
    personal.token={}
    key.passphrase={}
    port=443
    branch.to.protect=main
  ```

 - Finally, run `nohup node app.js &` to start the node js application in demon mode
