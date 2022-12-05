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

In Mongo Atlas, create a new project.
In network access, grant acee to 0.0.0.0/0
In database, create a cluster Free/Shared > AWS > São Paulo
In Security Quickstart, criar usuário do banco:
  User: fullstack
  senha:
In database, click in Connect >  Coonnect your application and copy the mongo URI
In mongtoDb URI, replace the password and add the database name between the "mongodb.net/" and "?".

## Deploy no Fly.io

Configurar as variáveis de ambiente MONGODB_URI e PORT.

A porta deve ser 8080.

```sh
yarn deploy
```

## Tests

Instalar o jest

```sh
yarn add --dev jest
```

No `package.json`:

a - adicionar o script `test`:

```json
"scripts": {
  ...
  "test": "jest --verbose"
  ...
}
```

b - No final do arquivo, adicionar a seguinte propriedade:

```json
"jest": {
  "testEnvironment": "node"
}
```

Na raiz do projeto, criar diretório `tests`.

Nesse diretório, pra cada suite de testes, criar um arquivo com o padrão `nome.test.js`.

No arquivo `eslintrc.js`, na chave `env`, adicione o valor `jest: true`
