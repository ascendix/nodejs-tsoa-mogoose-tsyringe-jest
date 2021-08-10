# Goal

Nodejs projects often criticized for being hard to maintain and scale. Lots of tools and libraries in open source community provide help in this area and we decided to put some of them together and prepare a project template.

[tsoa](https://github.com/lukeautry/tsoa)

tsoa provides routes, validation, security wrapper and automatic swagger annotations. It is easy to create new controllers with security middleware, parameters and requests validation and swagger support.

[mongoose](https://mongoosejs.com/)

MongoDB proved to be a choose #1 in our days. Project contains example of repository layer and schema. Just change MONGODB_CONNECTION_STRING.

[tsyringe](https://github.com/microsoft/tsyringe)

DI is proven to be essential in medium and large projects. tsyringe provides necessary DI which helps to mock components during testing and modify functionality by replacing implementations.

[jest](https://github.com/facebook/jest)

with jest and di it is easy to replace necessary implementations with mocks and test API using supertest.

# Table of contents

[Controllers](#addController)

[DI](#useDI)

[Model](#model)

[Tests](#tests)

<a name="gettingStarted"></a>

# Getting started

## Install dependencies:

`npm i`

Start tsoa routes-specs watch and nodemon: `npm run dev`

Run tsoa routes-specs and tests: `npm run test`

Run tsoa routes-specs as separate step to compile swagger.json and routes: `npm run tsoa`

<a name="addController"></a>

## Controllers

To add new controller add .ts file to api/controllers folder and extend _Controller_ class from **tsoa**.

_Route_ decorator stands for path to controller:

`@Route('/api/v1/record')`

_Tags_ groups controllers in swagger:

`@Tags('RecordController')`

If you want action to use security middleware use _Security_ decorator. More in the [Security](#security):

`@Security('jwt')`

or for additional scopes:

`@Security('jwt', ['ADMIN'])`

In our example we pass required role to access action. Logic for it is open for modification for your project and stored in [auth.ts](https://github.com/ascendix/nodejs-tsoa-mogoose-tsyringe-jest/blob/main/nodejs-tsoa-mogoose-tsyringe-jest/src/api/middlewares/auth.ts)

If you want to validate query parameters or body object use tsoa [annotations](https://tsoa-community.github.io/docs/annotations.html):

`@minLength recordId 1 Record ID param is empty `

`` @pattern recordId `[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}` invalid GUID value ``

<a name="useDI"></a>

## DI

To inject implementation into class you need to mark it as `@injectable()` and requested necessary interface in constructor:

`constructor( @inject('IRecordsService') private recordsService: IRecordsService ) { super(); }`

Injected object is accessible in this:

`this.recordsService.create(request.user, body);`

To register implementation in container do to [src/ioc/index.ts](https://github.com/ascendix/nodejs-tsoa-mogoose-tsyringe-jest/blob/main/nodejs-tsoa-mogoose-tsyringe-jest/src/ioc/index.ts):

`container.register('IRecordsService', { useClass: RecordsService });`

More about container and registration at [tsyringe](https://github.com/microsoft/tsyringe)

<a name="model"></a>

## Model

In _scr/models_ you can find example of domain entity without dependencies. We recommend to divide dto's with tsoa decorators and schemas for mongoose from clean model types.

Example of schema could be found in [src/repositories/record/RecordSchema.ts](https://github.com/ascendix/nodejs-tsoa-mogoose-tsyringe-jest/blob/main/nodejs-tsoa-mogoose-tsyringe-jest/src/repositories/record/RecordSchema.ts)

More about mongoose [schema](https://mongoosejs.com/docs/guide.html#definition)

<a name="tests"></a>

## Tests

Specs could be found in _src/\_\_tests\_\_/specs_ and mocks in _src/\_\_tests\_\_/mocks_.

In _src/\_\_tests\_\_/mocks/index.ts_ you need to override necessary interfaces with test implementation. In our example it is DB layer to work with in-memory storage instead of real Mongo:

`container.register('IMongoLoader', { useClass: TestMongoLoader });`

`container.register('IRecordsRepository', { useClass: TestRecordsRepository });`
