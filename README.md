# Welcome to Fulstack Open 2022 - Blog List 👋

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE)
[![Twitter: josenaldomatos](https://img.shields.io/twitter/follow/josenaldomatos.svg?style=social)](https://twitter.com/josenaldomatos)

> This is the frontend component of the Blog List application. The main focus of
> this project is on building an application with ReactJS that uses REST APIs
> built with Node.js.
>
> The app allows users to create and manage a list of blogs, with features such as
> adding, editing, and deleting blogs. This project serves as a great example of
> how to build a modern and responsive web application using ReactJS and other
> cutting-edge web development technologies.

## [Fullstack Open 2022 course](https://fullstackopen.com/en/)

This project is part of the Fullstack Open 2022 course, a comprehensive course
that introduces learners to modern web application development using
JavaScript. The course covers a wide range of topics including building
single-page applications using ReactJS, REST APIs built with Node.js, and
GraphQL. Participants will learn about testing, configuration, environment
management, and the use of databases for storing application data. The course
is free of charge and offers a certificate upon completion, as well as the
opportunity to earn 5-14 ECTS credits from the University of Helsinki.

The course is designed for individuals with good programming skills and basic
knowledge of web programming and databases, as well as familiarity with Git
version control. Participants are expected to have perseverance, independent
problem-solving skills, and the ability to seek out information when necessary.

The course has partnerships and affiliations with companies such as Houston
Inc, Terveystalo, Elisa, Unity Technologies, and Konecranes. Guest lectures by
experts from these companies are included in the course material. Participants
can join the conversation and discuss course-related topics in the dedicated
Discord and Telegram groups. Overall, Full Stack Open 2022 provides a
comprehensive and practical introduction to modern web application development
using the latest tools and technologies.

## ✨ [Demo](https://fso2022-bloglist-backend.fly.dev)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js
- You have a MongoDB database (or a Mongo Atlas account)
- You have a Fly.io account (for deployment)

## Installation and Setup

To install the dependencies, run:

```sh
## Install
yarn install
```

To run the server in development mode, run:

```sh
yarn dev
```

To run the tests, run:

```sh
yarn test
```

To run the server in production mode, run:

```sh
yarn start
```

To clean the project directory, run:

```sh
yarn clean
```

To lint the code, run:

```sh
yarn lint
```

## Deployment

To deploy the application to Fly.io, follow these steps:

1. Set the following secrets in Fly.io:

   - `MONGODB_URI` - MongoDB URI
   - `SECRET` - Secret key for signing JSON Web Tokens

   ```sh
   fly secrets set MONGODB_URI=<mongodb-uri>

   fly secrets set SECRET=<secret-key>
   ```

2. Run the following command to deploy the application:

   ```sh
   yarn deploy
   ```

3. To view the deployed application, run:

   ```sh
   yarn open
   ```

4. To view the production logs of the application, run:

   ```sh
   yarn logs:prod
   ```

## Technologies

This project uses the following technologies:

### Development Dependencies

- [ESLint](https://eslint.org/)
  - A pluggable and configurable linter tool for identifying and reporting
    patterns in JavaScript.
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)
  - A set of ESLint rules for JavaScript that is based on Airbnb's style guide.
- [Prettier ESLint Config](https://github.com/prettier/eslint-config-prettier)
  - A configuration for disabling ESLint rules that conflict with Prettier.
- [ESLint Import Plugin](https://github.com/import-js/eslint-plugin-import)
  - A plugin that adds linting of ES6 import/export syntax and extension
    checking.
- [Jest](https://jestjs.io/)
  - A JavaScript testing framework designed to ensure correctness of any
    JavaScript codebase.
- [Supertest](https://github.com/ladjs/supertest)
  - A high-level abstraction for testing HTTP, while still allowing you to
    drop down to the lower-level API provided by `superagent`.
- [Nodemon](https://nodemon.io/)
  - A tool that helps develop node.js based applications by automatically
    restarting the node application when changes are detected in the files of
    the project.

#### Dependencies

- [CORS](https://github.com/expressjs/cors)
  - A node.js package for providing a Connect/Express middleware that can
    be used to enable CORS with various options.
- [dotenv](https://github.com/motdotla/dotenv)
  - A zero-dependency module that loads environment variables from a .env
    file into process.env.
- [Express.js](https://expressjs.com/)
  - A minimalist web framework for Node.js that provides a robust set of
    features for web and mobile applications.
- [Lodash](https://lodash.com/)
  - A JavaScript utility library that provides helper functions for dealing
    with objects, arrays, and strings.
- [Mongoose](https://mongoosejs.com/)
  - A MongoDB object modeling tool designed to work in an asynchronous
    environment.
- [Morgan](https://github.com/expressjs/morgan)
  - An HTTP request logger middleware for Node.js.

#### Deployment platforms

- [MongoDB Cloud](https://cloud.mongodb.com/)
  - A cloud-based MongoDB service that provides automated backups, monitoring,
    and alerting.
- [fly.io](https://fly.io/)
  - A platform for running applications on a global edge network.

## Author

👤 **Josenaldo de Oliveira Matos Filho**

- Website: <josenaldo.github.io>
- Twitter: [@josenaldomatos](https://twitter.com/josenaldomatos)
- Github: [@josenaldo](https://github.com/josenaldo)
- LinkedIn: [@josenaldo](https://linkedin.com/in/josenaldo)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
_This README was improved by ChatGPT_
