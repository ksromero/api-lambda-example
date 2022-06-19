
# API Lambda Example

This project contains a simple API for practice purpose and maybe for new learners like me exploring the aws serverless world. 

A user can have N of posts and has a daily limit of posts
that we can attach.



## Techs Used

* [Node js](https://nodejs.org/en/) / Typescript
* [AWS (Lambda, API Gateway, Route 53)](https://aws.amazon.com/)
* [Serverless Framework](https://github.com/serverless/serverless)

**Main library used in Node js**
* [Joi](https://github.com/sideway/joi) used for API validation
* [Typegoose](https://github.com/typegoose/typegoose) used to define Mongoose models using TypeScript classes
* [Mongoose](https://github.com/Automattic/mongoose) to interact with database
* [Inversify](https://github.com/inversify/InversifyJS) an IoC container uses a class constructor to identify and inject its dependencies.
## Architecture

I used the [single purpose function](https://github.com/cdk-patterns/serverless/tree/main/the-lambda-trilogy)
in lambda trilogy. Functions are grouped into module and each module are attached to an API gateway and [glued together using custom domain](https://www.serverless.com/blog/api-gateway-multiple-services/).

![image]()
## Folder structure
Top folder is represented by module name `(except for repositories)`, each files under `src` are lambda functions.

    └── posts/
        ├── src/
        │   ├── createPost.ts
        │   └── getAllPosts.ts
        └── tests/
            └── ...
    └── repositories/
        ├── di
        ├── modules
        ├── shared
        └── tests
**repositories folder**

`repositories` folder represent the common codes used by each modules (users, posts, users posts)

* `di` has files that are needed for dependency injection `e.g. container.ts`
* `modules` has files that represent each module (I used [repository pattern](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design))
* `shared` has files that are common and might be used in each lambda fns.


**Notes:** if we build or test the project there's additional folder included like `coverage` and `dist`
## API reference
```
<API_GATEWAY_URL>/user-management/users // get all users //(GET)
<API_GATEWAY_URL>/user-management/user // create user // (POST)
<API_GATEWAY_URL>/post-management/posts // get all posts // (GET)
<API_GATEWAY_URL>/post-management/post // create post // (POST)
<API_GATEWAY_URL>/user-post-management/users-posts // get all users posts //(GET)
<API_GATEWAY_URL>/user-post-management/user-post // attach post to user // (POST)
```
## Todos maybe
* `CI/CD` for each module and if we commit our code only the changed files under a specific module should be deployed (monorepo), I'm still exploring this and still not sure how to implement it lol.
* `AWS cognito` for auth purpose and to protect the API's
