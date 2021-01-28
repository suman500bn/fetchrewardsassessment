# Fetch Rewards Backend assessment

# Requirements
* Javascript
* Packages : Node.js

# Install Requirements
npm install

# Assumptions
* add_points REST endpoint accept parameters as a json constisting of payerName, points and transactionDate

# Run the app
npm start
node server.js

# Run unit tests
npm run test


# REST API

The REST API to the app is described below.

## Add points to the User account

### Request

`POST /v1/addpoints/`

    curl -i -H 'Accept: application/json''payerName='DANNON'&'points'=300'&'transactionDate'="10/31 10AM' http://localhost:8000/v1/addpoints

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json


## Deduct points from the User account

### Request

`DELETE /v1//deletepoints/`

    curl -i -H 'Accept: application/json' http://localhost:8000/v1/deletepoints/5000

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    [["DANNON",-100,"now"],["UNILEVER",-200,"now"],["MILLER COORS",-4700,"now"]]

`GET /v1/balance/`

    curl -i -H 'Accept: application/json' http://localhost:8000/v1/balance

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"DANNON":1000,"MILLER COORS":5300,"UNILEVER":0}

