# Instructions

## Create project dir

## Configure yarn

Execute this command and answer all questions:

```sh
yarn init
```

## Add dev libs

```sh
yarn add --dev eslint eslint-config-prettier eslint-config-prettier nodemon
```

## Add libs

```sh
yarn add mongoose morgan dotenv express cors
```

## Add scripts

In `package.json` file, add the initial scripts

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "clean": "npx rimraf build",
  "lint": "eslint ."
}
```

## Generate readme

```sh
npx readme-md-generator
```

## Generate license

```sh
npm install -g mit-license-generator

license-mit create -a josenaldo -y 2022
```

## Generate .gitignore

```sh
npx gitignore node
```

## Generate .editorconfig

Configure with 4 spaces for ident size and insert final newline as false

```sh
npx create-editorconfig
```

For more information, see <https://github.com/DouglasdeMoura/create-editorconfig>

## Configure ESlint

```sh
npm init @eslint/config
```

## Config prettier

Create a file `.prettierrc` with this config:

```json
{
  "trailingComma": "es5",
  "semi": false,
  "singleQuote": true
}
```

## Config Fly.io

```sh
flyctl launch
```
