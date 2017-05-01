Hapi-graphql with Good logging issue :(
=======================================

Shows issue with combination of [good](https://www.npmjs.com/package/good) logging and [hapi-graphql](https://github.com/SimonDegraeve/hapi-graphql), where `request.payload` ends up being the `IncomingMessage` instance, which can lock up a server in an endless loop.


Triggering the issue
--------------------

```
POST /graphql
Content-Type: application/json
accept: application/json

{"query":"{hello { message } }","variables":null,"operationName":null}
```

This will make the `request.payload` in the logging stack map to `IncomingMessage` rather than the actual payload.



It works with non-hapi-graphql endpoints
----------------------------------------

```
POST /
Content-Type: application/json
accept: application/json

{"query":"{hello { message } }","variables":null,"operationName":null}
```

In this case `request.payload` correctly maps to the object we sent in.
