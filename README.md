#### Struct of project (Main dir is src)
List dirs in src:
- app: Include app infomation, define and use some needed package or lib
- config: Include some config for this app (firebase config)
- controller: Main handler for endpoints. Specify services for endpoints and res for FE
- core: Config class for res using in controller
- middleware: Define soem middleware to use in this app (auth middleware)
- route: Specify handler for each endpoint
- service: Include funcs handle for each endpoint. Here, func will interact with DB, others service, handle logic and return data to res for FE
- utils: Write func support for this app, can use in many where without write many code
- server file: run server

  Before run this project, please add some enviroment variable:
  
  | enviroment variable | description |
  | ------------------- | ----------- |
  | ACCESS_TOKEN_SECRET | secret string for generate access token |
  | ACCESS_TOKEN_EXPIRY | token lifetime |
  | CLIENT_URL          | FE url  |
  | EMAIL               | email for send verification code |
  | EMAIL_PASSWORD      | password of email |

After then, you must add key.json file into src dir. This key.json file will get from firebase console when you generate infomation to connect from this project to firebase

Install all needed package:
```npm i```

And run this project:
```npm start```
