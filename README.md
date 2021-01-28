# Fetch Rewards Backend assessment

# Requirements
* Javascript
* Packages : Node.js

# Install Requirements
npm install


# Run the app
npm start
node server.js

# Run unit tests
npm run test


# REST API

The REST API to the app is described below.

## Add points to the User account

### Request

curl --location --request POST 'http://localhost:8000/v1/addpoints' \
--header 'Content-Type: application/json' \
--data-raw '{
     "payerName":"DANNON",
     "points": 300,
     "transactionDate": "10/31 10AM" 
}'

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json


## Deduct points from the User account

### Request

curl --location --request DELETE 'http://localhost:8000/points/deletepoints' \
--header 'Content-Type: application/json' \
--data-raw '{
    "points_to_deduct": 5000
}'

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    [[ "DANNON", -100, "now"],["UNILEVER",-200,"now"],["MILLER COORS",-4700,"now"]]
    
## To get balance points from User accounts

### Request

curl --location --request GET 'http://localhost:8000/v1/balance'

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"DANNON":1000,"MILLER COORS":5300,"UNILEVER":0}

