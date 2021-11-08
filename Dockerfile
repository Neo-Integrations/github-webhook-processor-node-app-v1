FROM node:16

ENV WEBHOOK_TOKEN ""
ENV GITHUB_PERSONAL_TOKEN ""
ENV KEY_PASS ""
ENV PORT "443"
ENV BRANCH_TO_PROTECT "main"

# Create the certificate directory and copy all the certificates
RUN mkdir -p /usr/src/app/certs
COPY certs/cert.pem /usr/src/app/certs/
COPY certs/private.key /usr/src/app/certs/ 

RUN touch /usr/src/app/.env

# Copy all the JS files
COPY app.js /usr/src/app/ 
COPY auth.js /usr/src/app/
COPY branch-protection.js /usr/src/app/

# Copy all the node js package
COPY package* /usr/src/app/

WORKDIR /usr/src/app

RUN npm install

EXPOSE 443

CMD [ "npm", "start" ]