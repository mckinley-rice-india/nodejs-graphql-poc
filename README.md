### POC on GraphQL with NodeJS + Express + Apollo + MongoDB
<hr/>

### Instructions:
* `npm i` to install required dependencies.
* `npm start` to start the server.
* Head to `localhost:4000` to run queries in action.
* Import [collection](GraphQL%20POC.postman_collection.json) into postman to get list of available queries.

### Folder Structure:
- __nodejs\-graphql\-poc__
   - [GraphQL POC.postman\_collection.json](GraphQL%20POC.postman_collection.json)
   - [README.md](README.md)
   - [index.js](index.js)
   - [package\-lock.json](package-lock.json)
   - [package.json](package.json)
   - __src__
     - __graphql__ 
       - __resolvers__ # Graphql resolver functions
         - [auth.js](src/graphql/resolvers/auth.js)
         - [comment.js](src/graphql/resolvers/comment.js)
         - [index.js](src/graphql/resolvers/index.js)
         - [post.js](src/graphql/resolvers/post.js)
         - [user.js](src/graphql/resolvers/user.js)
       - __schemas__ # Graphql query & mutation schema
         - [comment.js](src/graphql/schemas/comment.js)
         - [index.js](src/graphql/schemas/index.js)
         - [post.js](src/graphql/schemas/post.js)
         - [user.js](src/graphql/schemas/user.js)
     - __models__ # Mongoose database models
       - [comment.js](src/models/comment.js)
       - [index.js](src/models/index.js)
       - [post.js](src/models/post.js)
       - [user.js](src/models/user.js)
     - __validations__ # Custom request validator
       - [index.js](src/validations/index.js)
       - [schemas.js](src/validations/schemas.js)