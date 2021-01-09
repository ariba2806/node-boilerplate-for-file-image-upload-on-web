## REST

Representational State Transfer - Application Programming Interface (REST API or RESTful API)

Client will make an HTTP request on our server, `GET /tasks/a722a` 
The server will look for the data in the database and send a response.

## REQUEST

```
POST /tasks HTTP/1.1
Accept: application/json
Connection: Keep-Alive
Authorization: Bearer {some_hash}

{*description*: *Order new drill bits*}
```

## RESPONSE

```
HTTP/1.1 201 Created
Date: Mon, 21 2020 03:00:56 GMT
Serve: Express
Content-Type: application/json

{"_id": "5f6802c35d2c374bc88185cd", "description": "Order new drill bits", "completed": false}
```