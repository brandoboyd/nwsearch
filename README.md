# NewWave Search Microservice
Serverless Lambda functions for Search feature

## One time setup
* Install Serverless globally `npm install serverless -g`
* Install docker https://docs.docker.com/engine/installation/

## To run & debug lambda locally

This mode have webpack monitor files for changes


* Follow instruction in the README.md of
   http://github.nw.adesa.com/new-wave/nw-localstack#one-time-setup-required-for-global-package

* Install dependencies
```
npm install
```
* Run this to setup the required dockers containers 
```
npm run localstack:all:up
```

* To start webserver
```
npm start
```
If `npm start` fails run
```
npm run build:webpack
```

* To run unittest  - it also executes all unit tests configured under /test/unit/main
```
npm run dev:test:unit
```

## To deploy to AWS
It's recommend to use a custom stage for AWS deployment
```
sls deploy --stage <username>
sls remove --stage <username>
```

* To run code coverage
```
npm run coverage
```

## References
* Document on `package.json` https://confluence.nw.adesa.com/display/NW/%5BWIP%5D++Package.json+scripts+description
* NewWave AuthZN: https://confluence.nw.adesa.com/display/NW/NW+AuthNZ+flow?src=contextnavpagetreemode
* NewWave Access Group Management: https://confluence.nw.adesa.com/display/NW/NW+AccessGroup+Management
* NewWave Custom Authorizer implementation: https://confluence.nw.adesa.com/display/NW/NW+Custom+Authorizer+in+API+Gateway?src=contextnavpagetreemode
