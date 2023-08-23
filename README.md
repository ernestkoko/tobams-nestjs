
## Description
This is a test application with Nestjs.
I uses both local and jwt for authentication and authorisation.

A user can register with the  POST /user endpoint
Upon registration a user can login with the auth/login endpoint and a Bearer token is generated and sent to the user. He uses the bearer token to access other endpoints that are Guarded.

A user can not edit his details except they log in and have access to their bearer token.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Ernest Eferetin](https://www.linkedin.com/in/ernesteferetin)

## License

Nest is [MIT licensed](LICENSE).
