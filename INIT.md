# Full Stack JavaScript Project Starter Guide - Backend

This guide provides a step-by-step process for setting up a full stack
JavaScript project using React, Express, MongoDB, and testing tools. By
following the instructions in this guide, you will be able to create a
well-structured project with a consistent development environment and best
practices in place.

## Table of Contents

- [Full Stack JavaScript Project Starter Guide - Backend](#full-stack-javascript-project-starter-guide---backend)
  - [Table of Contents](#table-of-contents)
  - [Project Setup](#project-setup)
    - [Create project dir](#create-project-dir)
    - [Configure yarn](#configure-yarn)
    - [Add Development Libraries](#add-development-libraries)
    - [Add Main Libraries](#add-main-libraries)
    - [Add NPM Scripts](#add-npm-scripts)
    - [Generate readme](#generate-readme)
    - [Generate license](#generate-license)
    - [Generate `.gitignore`](#generate-gitignore)
    - [Generate `.editorconfig`](#generate-editorconfig)
    - [Configure ESlint](#configure-eslint)
    - [Configure prettier](#configure-prettier)
    - [Configure Fly.io](#configure-flyio)
  - [Project structure](#project-structure)
  - [Create a MongoDB database](#create-a-mongodb-database)
  - [Create a MongoDB database for your project](#create-a-mongodb-database-for-your-project)
  - [Deploying to Fly.io](#deploying-to-flyio)
  - [Tests](#tests)
    - [Installing Jest](#installing-jest)
    - [Configuring Jest](#configuring-jest)
    - [Configuring the Testing Environment](#configuring-the-testing-environment)
    - [Configure Cross-Environment Scripts](#configure-cross-environment-scripts)
    - [Running Tests](#running-tests)
    - [Supertest](#supertest)
    - [Refactoring for Testing](#refactoring-for-testing)
      - [/utils/config.js](#utilsconfigjs)
      - [`.env`](#env)
    - [Preparing the app for tests with Cypress](#preparing-the-app-for-tests-with-cypress)
  - [Authentication](#authentication)
    - [Create User](#create-user)
      - [Install Required Libraries](#install-required-libraries)
      - [Write Tests for User Creation](#write-tests-for-user-creation)
      - [Define User Model](#define-user-model)
      - [Create Route and Controller for User Creation](#create-route-and-controller-for-user-creation)
    - [Login](#login)
      - [Write Tests for Login](#write-tests-for-login)
      - [Create Route and Controller for Login](#create-route-and-controller-for-login)

## Project Setup

This section guides you through the initial configuration process required for
a full-stack JavaScript project using React, Express, MongoDB, and testing
libraries. By following these steps, you will set up the essential tools and
libraries needed to develop, test, and deploy your application.

### Create project dir

In this step, you will create a new directory for your project and initialize
it as a Git repository. This will allow you to easily track and manage changes
to your project's files using version control. Follow these instructions:

1. Open a terminal and navigate to the location where you want to create the
   project folder.
2. Run the following command to create a new directory and navigate into it:

  ```sh
  mkdir your-project-name && cd your-project-name
  ```

  Replace your-project-name with the desired name for your project.
3. Initialize a new Git repository inside the project directory:

  ```sh
  git init
  ```

4. Make an initial commit to your Git repository with a simple message
   indicating the project's creation:

  ```sh
  git add .
  git commit -m "Initial project setup"

  ```

Now your project directory is set up and ready for the next steps in the
configuration process.

### Configure yarn

In this step, you will initialize your project using Yarn, a package manager
for JavaScript projects. This will create a `package.json` file containing
essential information about your project, such as its name, version, and
dependencies. To do this, follow these instructions:

1. With the terminal still open in your project directory, run the following
   command:

  ```sh
  yarn init
  ```

2. Yarn will prompt you with several questions about your project. Answer them
   accordingly or press enter to accept the default values. Some of the
   questions you may be asked include:

   - name: The name of your project
   - version: The initial version of your project
   - description: A short description of your project
   - main: The entry point file of your project (usually `index.js`)
   - author: Your name or the name of your organization
   - license: The type of license your project uses

3. After answering the questions, Yarn will generate a `package.json` file in
   your project directory. This file will be used to manage your project's
   dependencies and scripts.

Your project is now configured with Yarn, and you can proceed to the next steps
in the configuration process.

### Add Development Libraries

In this step, you will add development libraries to your project. These
libraries will help improve the development process by providing features such
as code linting, formatting, and live reloading during development.

Run the following command to install the necessary development libraries:

```sh
yarn add  eslint eslint-config-prettier eslint-config-prettier nodemon --dev
```

Here's a brief explanation of each library:

- **eslint**: A popular JavaScript linter that helps to identify and report
  potential issues in your code, following a set of customizable rules.
- **eslint-plugin-prettier**: Integrates Prettier, a code formatter, with
  ESLint, allowing you to use Prettier as an ESLint rule.
- **eslint-config-prettier**: A configuration that turns off ESLint rules that
  might conflict with Prettier's formatting.
- **nodemon**: A development utility that automatically restarts your Node.js
  application when files change.

With these libraries installed, your project is now set up with essential
development tools that will help streamline your workflow and ensure a
consistent code style.

### Add Main Libraries

In this step, you will add the main libraries that your project requires. These
libraries provide essential functionalities to your application, such as
database handling, logging, environment variable management, and server setup.

Run the following command to install the necessary libraries:

```sh
yarn add mongoose morgan dotenv express cors
```

Here's a brief explanation of each library:

- **mongoose**: An Object Data Modeling (ODM) library for MongoDB that
  provides a simple and schema-based solution to model your application data.
- **morgan**: An HTTP request logger middleware for Node.js, which helps you log
  and track incoming requests to your server.
- **dotenv**: A library that allows you to load environment variables from a
  `.env` file into your Node.js application, making it easy to manage and
  protect sensitive information.
- **express**: A minimal and flexible Node.js web application framework that
  provides a robust set of features for building web and mobile applications.
- **cors**: A Node.js package that provides an Express middleware to enable
  Cross-Origin Resource Sharing (CORS) for your application, allowing different
  domains to access your server resources.

With these libraries installed, your project now has the foundational
components required for building and managing a full-stack JavaScript
application.

### Add NPM Scripts

In this step, you will define a set of NPM scripts in the `package.json` file.
These scripts will help you automate and simplify various tasks during the
development and deployment of your application.

Update the scripts section of your `package.json` file with the following:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "clean": "npx rimraf build",
  "lint": "eslint ."
}
```

Here's an explanation of each script:

- **"start"**: This script is used to start your application in a production
  environment. It runs your application using the node command with the
  `index.js` file as the entry point.
- **"dev"**: This script is used during development. It starts your application
  using nodemon, a utility that automatically restarts your application
  whenever a file changes. This helps you see changes in real-time without
  manually restarting the server.
- **"clean"**: This script deletes the build directory using the rimraf utility.
  The build directory contains compiled files and is typically generated during
  a build process. This script is useful when you need to clean up your project
  before building it again.
- **"lint"**: This script runs ESLint, a popular linting tool for JavaScript, to
  analyze your code and identify potential issues. It helps maintain a
  consistent coding style and prevent bugs.

### Generate readme

In this step, you will create a README file for your project using a generator
tool. The README file is an essential part of any software project, as it
provides documentation and guidelines for users and contributors.

To generate a README file, run the following command:

```sh
npx readme-md-generator
```

This command uses readme-md-generator, an npm package that helps you create a
well-structured and customizable README file. After running this command, you
will be prompted with a series of questions about your project, such as its
name, description, author, and license. Based on your answers, the generator
will create a README file tailored to your project.

By generating a README file, you ensure that your project has clear
documentation and instructions, making it easier for others to understand and
contribute to your project.

### Generate license

In this step, you will generate a license for your project using the
mit-license-generator package. This package will create a MIT license file that
you can include in your project.

To generate a license file, follow these steps:

1. Install the mit-license-generator package globally by running the
   following command:

```sh
npm install -g mit-license-generator
```

2. Once installed, generate a MIT license file using the following command:

  ```sh
  license-mit create -a [your-full-name] -y [year]
  ```

Replace `[your-full-name]` with your full name and `[year]` with the year you
want the license to apply to.

After running this command, a LICENSE file will be generated in your project directory.

Including a license file in your project is important as it informs users of
your project's terms of use and helps protect your work.

### Generate `.gitignore`

In this step, you will generate a `.gitignore` file using the gitignore npm
package. This file specifies the files and directories that Git should ignore
when tracking changes in your project, such as build artifacts, logs, and
dependencies. To generate a .gitignore file for a Node.js project, run the
following command:

```sh
npx gitignore node
```

This command creates a `.gitignore` file in your project directory that includes
common Node.js files and directories that should not be tracked by Git.

By using a `.gitignore` file, you can avoid accidentally committing sensitive or
unnecessary files to your Git repository, ensuring that your repository stays
clean and organized.

### Generate `.editorconfig`

In this step, you will generate an `.editorconfig` file for your project. The
`.editorconfig` file defines a standard coding style for your project, such as
indentation size, line endings, and encoding. This helps maintain a consistent
coding style across different editors and IDEs.

To generate an `.editorconfig` file, run the following command:

```sh
npx create-editorconfig
```

This command uses create-editorconfig, an npm package that generates an
`.editorconfig` file with default configurations. The default configurations use
2 spaces for indentation size and set insert final newline to false. You can
customize the generated `.editorconfig` file to suit your project's needs.

For more information on how to customize your `.editorconfig` file, see <https://github.com/DouglasdeMoura/create-editorconfig>.

### Configure ESlint

In this step, you will initialize your project's ESlint configuration using the
@eslint/config package. This will allow you to customize and enforce consistent
coding style and quality standards in your project.

Run the following command to initialize your project's ESlint configuration:

```sh
npm init @eslint/config
```

This command will prompt you to select a style guide or configuration from the
available options. You can choose from popular options such as Airbnb,
Standard, or Google, or you can customize your own configuration based on your
project's needs.

Once you have selected a configuration, ESlint will generate a `.eslintrc.json`
file in your project's root directory. This file contains the ESlint
configuration for your project, including rules and settings that enforce
coding standards and identify potential issues.

With ESlint configured, you can now enforce coding standards and best practices
in your project, ensuring a consistent code style and identifying potential
issues early on.

### Configure prettier

In this step, you will configure Prettier, a code formatter that ensures
consistent code style across your project. Prettier is highly customizable and
can be integrated with most editors and IDEs. Follow these instructions to
configure Prettier for your project:

1. Create a new file named `.prettierrc` in the root of your project.
2. Add the following configuration to your `.prettierrc` file:

  ```json
  {
    "trailingComma": "es5",
    "semi": false,
    "singleQuote": true
  }
  ```

This configuration sets the following options for Prettier:

- **trailingComma**: Adds a trailing comma wherever possible (except for
  function arguments).
- **semi**: Disables semicolons at the end of lines.
- **singleQuote**: Uses single quotes for strings.

You can customize these options to match your preferred code style.

With Prettier configured, you can now format your code with ease, ensuring
consistent code style throughout your project.

### Configure Fly.io

In this step, you will set up Fly.io, a platform that makes it easy to deploy,
manage, and scale your applications. Fly.io provides a global edge network with
low latency and high throughput, making it ideal for serving content to users
around the world.

To configure Fly.io, follow these instructions:

1. Install the Fly CLI by running the following command

  ```sh
  curl -L https://fly.io/install.sh | sh
  ```

  This command downloads and installs the Fly CLI, a command-line interface
  tool that you will use to interact with Fly.io.

2. Log in to your Fly.io account using the CLI

  ```sh
  flyctl auth login
  ```

  This command will open a web page where you can log in to your Fly.io account.
  After logging in, the CLI will generate an access token that you can use to
  interact with the Fly.io API.

3. Initialize a new Fly.io application by running the following command

  ```sh
  flyctl launch
  ```

  This command will guide you through the process of creating a new Fly.io
  application. You will be prompted to select a region for your application,
  give it a name, and choose a configuration file. For the configuration file,
  choose "Node.js" and select the appropriate version for your project.

4. After configuring your application, you can deploy it to Fly.io by running
   the following command:

  ```sh
  flyctl deploy
  ```

  This command will package and upload your application to Fly.io and create
  any necessary resources, such as load balancers and auto-scaling groups.

  By configuring Fly.io, you can easily deploy and manage your application in a
  highly scalable and performant environment.

## Project structure

The project structure aims to provide an organized and easy-to-navigate
codebase. It follows the Model-View-Controller (MVC) pattern, where each model
represents a collection in the database and each controller handles the
application's business logic.

The following files and folders should be created within your project directory:

- `controllers/`: Contains the application's controllers, which handle the
  business logic for each model.
  - `[model]s.js`: The controller file for the `[model]s` collection.
- `model/`: Contains the application's models, which represent the collections
  in the database.
  - `[model].js`: The model file for the `[model]s` collection.
- `requests/`: Contains the HTTP request files for each model, used in testing.
  - `[model]s_create.rest`: The file containing a POST request for creating a `[model]`.
  - `[model]s_delete.rest`: The file containing a DELETE request for deleting a `[model]`.
  - `[model]s_get.rest`: The file containing a GET request for retrieving a `[model]`.
  - `[model]s_get_all.rest`: The file containing a GET request for retrieving
    all `[model]s`.
  - `[model]s_update.rest`: The file containing a PUT request for updating a
    `[model]`.
- `tests/`: Contains the application's tests.
  - `[model]s_api.tests.js`: The test file for the API endpoints of the
    `[model]s` collection.
  - `test_helper.js`: The test helper file for setting up the test environment.
- `utils/`: Contains utility files used throughout the application.
  - `config.js`: The configuration file for the application.
  - `logger.js`: The logger file for the application.
  - `middleware.js`: The middleware file for the application.
- `app.js`: The entry point for the application, where the Express app is created.
- `index.js`: The file that starts the application by listening to a port.

By following this structure, you can maintain a well-organized and scalable
codebase.

## Create a MongoDB database

MongoDB is a popular NoSQL database that stores data in flexible, JSON-like
documents. Compared to traditional relational databases, MongoDB allows for
more dynamic and flexible data models, which can be especially useful for web
applications with varying and evolving data requirements. MongoDB also offers a
scalable and distributed architecture, which enables high performance and
availability.

MongoDB has become a popular choice for web developers due to its ability to
handle large and complex datasets, its ease of use, and its rich set of
features. Its document-based data model allows developers to easily store and
retrieve complex data structures, while its dynamic schema offers flexibility
and agility.

Some of the benefits of using MongoDB include:

- **Scalability**: MongoDB is designed to scale horizontally across many nodes,
  allowing applications to handle large amounts of data and high levels of
  traffic.
- **Flexibility**: MongoDB's document-based data model allows developers to
  store and retrieve complex and evolving data structures without having to
  define a rigid schema upfront.
- **Performance**: MongoDB is designed to deliver high performance and low
  latency, even at large scale. Its distributed architecture allows for
  automatic sharding and load balancing, ensuring that data is evenly
  distributed across nodes.
- **Ease of use**: MongoDB's flexible data model, intuitive query language,
  and rich set of features make it easy for developers to work with, even
  without extensive database experience.

Overall, MongoDB is a versatile and powerful database that can offer many
benefits to web developers looking to build scalable and flexible applications.

## Create a MongoDB database for your project

To create a MongoDB database for your project, follow these steps:

1. Create a new project in MongoDB Atlas.
2. In the 'Network Access' section of your project, click 'Add IP Address' and
   enter **0.0.0.0/0** to allow access from any IP address.
3. In the 'Database' section of your project, create a cluster using the
   'Free/Shared > AWS > São Paulo' configuration.
4. In the 'Security' section, create a new database user with the following
   credentials:
   - user: fullstack
   - password: anyone
5. In the 'Database' section, click on 'Connect' and select 'Connect your
   application'.
6. Copy the MongoDB URI provided in the modal.
7. Replace the `<password>` placeholder in the URI with the password you created
   for the fullstack user.
8. Add the name of your database between the mongodb.net/ and ? segments of
   the URI.

By following these steps, you will have created a new MongoDB database for your
project and obtained the necessary URI for connecting to it.

## Deploying to Fly.io

To deploy your application to Fly.io, follow these steps:

1. Open a terminal in the project directory and configure the following secrets
   in fly.io:

   - `MONGODB_URI` - MongoDB URI copied in the previous step
   - `PORT` - Set to 8080

  ```sh
  fly secrets set PORT=8080

  fly secrets set MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
  ```

  Replace `<user>`, `<password>`, `<cluster>`, and `<database>` with the
  appropriate values.

2. Add the following script to your `package.json` file:

  ```json
  "scripts": {
      "deploy": "flyctl deploy",
      "open": "flyctl open",
      "logs:prod": "flyctl logs"
  }
  ```

3. In the same terminal, run the following command to deploy your application
   to Fly.io:

  ```sh
  yarn deploy
  ```

4. If you want to open the deployed app, run the following command:

  ```sh
  yarn open
  ```

5. If you want to view the production logs of your application (this can be
   helpful for troubleshooting any issues that may arise.), run the following
   command:

  ```sh
  yarn logs:prod
  ```

By following these steps, you will have deployed your application to Fly.io,
making it available to the public.

## Tests

Automated testing is an essential practice in software development. It helps
ensure that your code behaves as expected, catches bugs early in the
development process, and gives you confidence in the quality of your codebase.
In this section, we'll cover how to set up testing using the Jest library.

### Installing Jest

To get started, you'll need to install the Jest library:

```sh
yarn add jest --dev
```

### Configuring Jest

1. In the `package.json` file, add the test script:

  ```json
  "scripts": {
    ...
    "test": "jest --verbose"
    ...
  }
  ```

  This script will run your tests using Jest.

2. Also in the `package.json` file, add the following jest configuration:

  ```json
  "jest": {
    "testEnvironment": "node"
  }
  ```

  This sets the testing environment to Node.js, which is necessary for running
  tests that interact with the file system, network, and other Node.js modules.

3. If not yet created, create a tests directory in the project root. For each
  test suite, create a file with the following name pattern: name.test.js.
4. In the `.eslintrc.js` file, in the env key, add the jest property:

  ```json
  env: {
    ...
    jest: true
    ...
  }
  ```

  This will allow ESLint to recognize Jest globals.

### Configuring the Testing Environment

In order to properly configure the testing environment for your project, follow
 these steps:

1. Open the package.json file in your project directory.
2. For the `start`, `dev`, and `test` scripts, add the `NODE_ENV` environment
   variable and set it to production, development, and test, respectively:

```json
"start": "NODE_ENV=production node index.js",
"dev": "NODE_ENV=development nodemon index.js",
"test": "NODE_ENV=test jest --verbose --runInBand"
```

By adding the `NODE_ENV` variable to these scripts, you will ensure that your
application runs in the correct environment depending on which script you are
running.

Note that the `test` script also includes the jest command with the `--verbose`
and `--runInBand` options, which will output detailed information about the
tests as they run and ensure that tests run in a serialized fashion.

### Configure Cross-Environment Scripts

If you are working on a Windows machine, you need to install the `cross-env`
library to make sure that the environment variables are set correctly.

To install `cross-env`, run the following command:

```sh
yarn add cross-env
```

Then, update the `start`, `dev`, and `test` scripts in your `package.json` file
to use cross-env at the beginning:

```json
"start": "cross-env NODE_ENV=production node index.js",
"dev": "cross-env NODE_ENV=development nodemon index.js",
"test": "cross-env NODE_ENV=test jest --verbose --runInBand --forceExit --all"
```

With `cross-env`, the `NODE_ENV` variable is set correctly, regardless of
whether you are working on Windows, macOS, or Linux.

### Running Tests

To run your tests, simply run the following command in your terminal:

```sh
yarn test
```

This will execute all the test suites in your tests directory.

By following these steps, you can ensure that your code is thoroughly tested
and that new changes don't break existing functionality.

### Supertest

To test your HTTP endpoints, you can use the `supertest` library. To install it,
run the following command in your terminal:

```sh
yarn add supertest
```

After installing `supertest`, you can create tests for your endpoints. In your
`tests` directory, create a new file with the following naming pattern:
`name.test.js`. In this file, you can use supertest to send requests to your
server and make assertions about the responses.

Here's an example of a simple test using `supertest`:

```js
const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  test('responds with 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
```

In this test, we are making a `GET` request to the root route of our application
(`/`). We expect the response to have a status code of `200`. You can customize
this test to match the routes and responses of your own application.

By using `supertest`, you can automate your testing process and ensure that your
application is working as expected.

### Refactoring for Testing

After installing `supertest`, the following changes must be made:

#### /utils/config.js

1. The `MONGODB_URI` must be set according to the environment:

  ```js
  const MONGODB_URI =
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URI
  ```

2. Refactor the controllers, moving from promise-then to async-await.
3. Install `express-async-errors`:

  ```sh
  yarn add express-async-errors
  ```

#### `.env`

1. Add to the `.env` file a variable for the test database.

  ```env
  MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>-test?retryWrites=true&w=majority
  ```

### Preparing the app for tests with Cypress

To prepare the backend for testing with Cypress, there are a few steps that need to be taken:

1. Add a start:test script to package.json:

```json
"start:test": "cross-env NODE_ENV=test LOGS=true node index.js"
```

This script sets the `NODE_ENV` environment variable to "test" and enables logging by setting the `LOGS` variable to `true`. Setting the environment variable to "test" is important because it allows the server to use a different database during testing than it does during development. Enabling logging is also useful during testing because it allows us to see the requests and responses that are being made.

2. Create a testing controller:

Create a new file controllers/testing.js in the backend directory that exports an object with methods for creating and deleting test data

```js
const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = testingRouter

```

This controller is used to reset the test database before each test. By calling the `reset` method before each test, we can ensure that the database is in a known state before running the test.

3. Add testing middleware to app.js:

```js
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}
```

This middleware checks the value of the `NODE_ENV` environment variable and only adds the testing routes if the variable is set to "test". This ensures that the testing routes are not added when the server is running in production or development mode.

4. Refactor logger middleware:

```js
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test' || process.env.LOGS === 'true') {
    // ...
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test' || process.env.LOGS === 'true') {
    // ...
  }
}
```

By following these steps, we can prepare the backend for testing with Cypress and ensure that our tests run smoothly. We can control when logging occurs using the `info` and `error` functions, which can be useful during testing when we only want to see the logs for specific requests. These functions check if `NODE_ENV` is not `test` or if `LOGS` is `true` before logging the message, allowing us to disable logging during tests or enable it only when necessary.

## Authentication

Authentication is the process of verifying the identity of a user or system. In
a web application, authentication is essential to control access to resources
and data. The authentication process typically involves the use of usernames
and passwords, with the server verifying the validity of the credentials before
allowing access to protected resources.

In the context of this project, we will implement authentication to enable the
creation of user accounts and secure login to the application. This will
involve creating a user administration system, encrypting and validating
passwords, and implementing token-based authentication to secure access to
protected resources.

### Create User

To create the user administration, we will use the `bcrypt` library to encrypt
the password and the `mongoose-unique-validator` to validate the uniqueness of
the username.

#### Install Required Libraries

First, we need to install `bcrypt` and `mongoose-unique-validator` libraries:

```sh
yarn add bcrypt mongoose-unique-validator
```

#### Write Tests for User Creation

We need to write tests for the operation of creating a user. We can create a
new file `users_api.test.js` in the `tests` folder to hold these tests. We also
need a test helper `users_test_helper.js` in the `tests` folder.

In the `users_api.test.js` file, we create a test for the operation
`POST /api/users`.

#### Define User Model

Next, we define the `user` model in a new file `user.js` in the `models`
folder.  We also use the `mongoose-unique-validator` to
validate the uniqueness of the username.

#### Create Route and Controller for User Creation

Now, we can create the route `/api/users` and the controller `users.js` in the
`controllers` folder.

In the `users.js` controller, we implement the operation `POST /api/users`. In
this operation, we check if the user already exists, if not, we hash the
password and create the new user. We need to use the `bcrypt` library to hash
the password before saving the user to the database.

### Login

To handle login, we need to install the `jsonwebtoken` library:

```sh
yarn add jsonwebtoken
```

#### Write Tests for Login

We need to write tests for the operation of logging in. We can create a new
file `login_api.test.js` in the `tests` folder to hold these tests. We also
need a test helper `login_test_helper.js` in the `tests` folder.

In the `login_api.test.js` file, we create a test for the operation
`POST /api/login`.

#### Create Route and Controller for Login

Now, we can create the route `/api/login` and the controller `login.js` in the
`controllers` folder.

In the `login.js` controller, we implement the operation `POST /api/login`. In
this operation, we check if the user exists, if the password is correct, and
then create a JSON Web Token (JWT) that can be used to authenticate the user in
future requests.

By following these steps, we have created a user authentication system in our application.
