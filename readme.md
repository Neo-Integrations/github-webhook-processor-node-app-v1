# GitHub Webhook processor NodeJS application

This is a Node JS implementation of [github-webhook-processor-api-v1](https://github.com/Neo-Integrations/github-webhook-processor-api-v1) api. Since the original API implementation requires MuleSoft, a commercial software, ported it to a more standard technology

## User Guide
 - Clone the project

 - Change directory to the root of the project and run `npm install` to install all the dependencies

 - Create `.env` file at the root of the project. This file will have all the secrets, so keep it safe. Please note, since the secrets will be in plain text, the better approach will be to pass them as environment variable but for simplicity, I am using `dotenv` util.
  ```
  WEBHOOK_TOKEN=
  GITHUB_PERSONAL_TOKEN=
  KEY_PASS=
  PORT=443
  BRANCH_TO_PROTECT=main
  ```

 - Finally, run `nohup node app.js &` to start the node js application in demon mode

## Prerequisite

Since it is a NodeJS application, you will require to install NodeJS for your [platform](https://nodejs.org/en/download/).

### Mac
  If your Mac has [brew](https://brew.sh/), you can easily install the NodeJs using following formula `brew install node`

### Ubuntu

You can install NodeJS using the standard `apt-get` package manager.
```
sudo apt-get update
sudo apt-get install nodejs
```


## Docker Image

I have packaged the application as a docker image and uploaded to docker hub registry, so it can be easily be run anywhere. Below is the docker run command to run the application. You will need to pass correct secrets.

```docker
docker run -d \
-e WEBHOOK_TOKEN="" \
-e GITHUB_PERSONAL_TOKEN="" \
-e KEY_PASS="" \
-e PORT="443" \
-e BRANCH_TO_PROTECT="main" \
-p 443:443 \
--name github-webhook-processor-node-app-v1 aminul1983/github-webhook-processor-node-app-v1
```