# Project recipe

## Initial configuration

### Create project dir

### Configure yarn

Execute this command and answer all questions:

```sh
yarn init
```

### Add dev libs

```sh
yarn add --dev eslint eslint-config-prettier eslint-config-prettier nodemon
```

### Add libs

```sh
yarn add mongoose morgan dotenv express cors
```

### Add scripts

In `package.json` file, add the initial scripts

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "clean": "npx rimraf build",
  "lint": "eslint ."
}
```

### Generate readme

```sh
npx readme-md-generator
```

### Generate license

```sh
npm install -g mit-license-generator

license-mit create -a josenaldo -y 2022
```

### Generate .gitignore

```sh
npx gitignore node
```

### Generate .editorconfig

Configure with 4 spaces for ident size and insert final newline as false

```sh
npx create-editorconfig
```

For more information, see <https://github.com/DouglasdeMoura/create-editorconfig>

### Configure ESlint

```sh
npm init @eslint/config
```

### Config prettier

Create a file `.prettierrc` with this config:

```json
{
  "trailingComma": "es5",
  "semi": false,
  "singleQuote": true
}
```

### Config Fly.io

```sh
flyctl launch
```

## Project structure

- root
  - controllers
    - blogs.js
  - model
    - blog.js
  - utils
    - config.js
    - logger.js
    - middleware.js
  - app.js
  - index.js

## Create database

In **Mongo Atlas**, create a `new project`.

In **Network Access**, grant access to `0.0.0.0/0`

In **Database**, create a cluster `Free/Shared > AWS > São Paulo`

In **Security Quickstart**, create a database user:

- user: fullstack
- password: anyone

In **Database**, click in `Connect > Connect your application` and copy the mongo URI

In mongoDb URI, replace the password (`<password>`) and add the database name between the `mongodb.net/` and `?`.

## Deploy no Fly.io

Open a terminal in project folder and configure the following secrets in fly.io:

- MONGODB_URI=[mongodb uri coppied in previous step] and
- PORT=8080

```sh
fly secrets set PORT=8080

fly secrets set MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

In the same terminal, execute the fly.io deploy:

```sh
yarn deploy
```

If you want to open the deployed app, user the following command:

```sh
yarn open
```

## Tests

Install the jest library:

```sh
yarn add --dev jest
```

In the `package.json` file:

a - add the `test` script:

```json
"scripts": {
  ...
  "test": "jest --verbose"
  ...
}
```

b - At the end of file, add this property::

```json
"jest": {
  "testEnvironment": "node"
}
```

At the project root, create the `tests` directory. In this directory, for each test suit, you must create a file with the following name pattern: `name.test.js`.

c - At the `eslintrc.js` file, in the `env` key, add the property `jest: true`

## Configuring tests env

At the file `package.json`, add the `NODE_ENV` var the  `start`, `dev` and `test` scripts.

```json
"start": "NODE_ENV=production node index.js",
"dev": "NODE_ENV=development nodemon index.js",
"test": "NODE_ENV=test jest --verbose --runInBand"
```

### If working in windows, add cross-env

If you are working in windows, install the `cross-env` library.

```sh
yarn add --dev cross-env
```

At the `package.json`, call `cross-env` at the start of the `start`, `dev` and `test` scripts:

```json
"start": "cross-env NODE_ENV=production node index.js",
"dev": "cross-env NODE_ENV=development nodemon index.js",
"test": "cross-env NODE_ENV=test jest --verbose --runInBand --forceExit --all"
```

## Supertest

install `supertest` library:

```sh
yarn add supertest
```

## Refactoring

### /utils/config.js

The `MONGODB_URI` must be set according to the environment.

```js
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
```

Refactor the controller, moving from promise-then to async-await.

Install express-async-errors

### /.env

Add to the `.env` file a variable for the test database.

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>-test?retryWrites=true&w=majority
```
