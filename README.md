# Setting up Node JS, Express, MongoDB, Prettier, ESLint and Husky Application with Babel and authentication as an example

## Table of Contents

- [Introduction](#introduction)
- [What is Babel?](#what-is-babel)
- [Project Setup](#project-setup)
  - [Engine Locking](#engine-locking)
  - [Babel Setup](#babel-setup)
    - [Babel Configration](#babel-configration)
  - [Code Formatting and Quality Tools](#code-formatting-and-quality-tools)
    - [Prettier](#prettier)
    - [ESLint](#eslint)
  - [Setup logger for development](#setup-logger-for-development)
  - [Build file structure and basic express application](#build-file-structure-and-basic-express-application)
  - [Git Hooks](#git-hooks)
    - [Husky](#husky)
    - [Commitlint](#commitlint)
  - [VS Code](#vs-code)
    - [Configuration](#configuration)
    - [Debugging](#debugging)
- [Authentication](#authentication)
  - [Authentication Setup](#authentication-setup)
  - [Authentication Middleware](#authentication-middleware)
  - [Authentication Security](#authentication-security)
  - [Authentication validations](#authentication-validations)
  - [Authentication schemas](#authentication-schemas)
  - [Authentication Models](#authentication-models)
  - [Authentication Repositories](#authentication-repositories)
  - [Authentication Services](#authentication-services)
  - [Authentication Controllers](#authentication-controllers)
  - [Authentication Routes](#authentication-routes)
- [Summary](#summary)

---

## Introduction

All code from this tutorial as a complete package is available in this [repository](https://github.com/MKAbuMattar/template-express). If you find this tutorial helpful, please share it with your friends and colleagues, and make sure to star the repository.

Since the ECMAScript JavaScript Standard is revised annually, it is a good idea to update our code as well.

The most recent JavaScript standards are occasionally incompatible with the browser. Something like to babel, which is nothing more than a JavaScript transpiler, is what we need to fix this sort of issue.

So, in this little tutorial, I'll explain how to set up babel for a basic NodeJS Express application so that we may utilize the most recent ES6 syntax in it.

## What is Babel?

Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments. Here are the main things Babel can do for you:

- Transform syntax
- Polyfill features that are missing in your target environment (through a third-party polyfill such as core-js)
- Source code transformations (codemods)

## Project Setup

We'll begin by creating a new directory called `backend-template` and then we'll create a new `package.json` file. We're going to be using yarn for this example, but you could just as easily use NPM if you choose, but yarn is a lot more convenient.

```bash
mkdir backend-template
cd backend-template
yarn init -y
```

### Engine Locking

The same Node engine and package management that we use should be available to all developers working on this project. We create two new files in order to achieve that:

- `.nvmrc`: Will disclose to other project users the Node version that is being utilized.
- `.npmrc`: reveals to other project users the package manager being used.

`.nvmrc`

```bash
touch .nvmrc
echo "lts/fermium" > .nvmrc
```

`.npmrc`

```bash
touch .npmrc
echo 'engine-strict=true\r\nsave-exact = true\r\ntag-version-prefix=""\r\nstrict-peer-dependencies = false\r\nauto-install-peers = true\r\nlockfile = true' > .npmrc
```

Notably, the usage of `engine-strict` said nothing about `yarn` in particular; we handle that in `packages.json`:

open `packages.json` add the `engines`:

```json
{
  "name": "tutorial",
  "version": "0.0.0",
  "description": "",
  "keywords": [],
  "main": "index.js",
  "license": "MIT",
  "author": {
    "name": "Mohammad Abu Mattar",
    "email": "mohammad.khaled@outlook.com",
    "url": "https://mkabumattar.github.io/"
  },
  "homepage": "YOUR_GIT_REPO_URL#readme",
  "repository": {
    "type": "git",
    "url": "git+YOUR_GIT_REPO_URL.git"
  },
  "bugs": {
    "url": "YOUR_GIT_REPO_URL/issues"
  },
  "engines": {
    "node": ">=14.0.0",
    "yarn": ">=1.20.0",
    "npm": "please-use-yarn"
  }
}
```

### Babel Setup

In order to set up babel in the project, we must first install three main packages.

- _`babel-core`_: The primary package for running any babel setup or configuration is babel-core.
- _`babel-node`_: Any version of ES may be converted to ordinary JavaScript using the babel-node library.
- _`babel-preset-env`_: This package gives us access to forthcoming functionalities that node.js does not yet comprehend. New features are constantly being developed, thus it will probably take some time for NodeJS to incorporate them.

Babel is mostly used in the code base to take advantage of new JavaScript capabilities. Unless the code is pure JavaScript, we don't know if the server's NodeJS will comprehend the specific code or not.

Therefore, transiling the code before deployment is usually advised. Two different types of babel transpiling code exist.

Development Setup:

```bash
yarn global add nodemon

# for linux users
sudo yarn global add nodemon
```

```bash
yarn add express mongoose cors dotenv @babel/core @babel/node @babel/preset-env

##  compression cookie-parser core-js crypto-js helmet jsonwebtoken lodash regenerator-runtime
```

```bash
yarn add -D @babel/cli babel-plugin-module-resolver
```

Here, we initialize the package.json and install the basic express server, mongoose, cors, dotenv, babel-core, babel-node, babel-preset-env, babel-plugin-module-resolver.

#### Babel Configration

After that, we need to create a file called `.babelrc` in the project's root directory, and we paste the following block of code there.

```bash
touch .babelrc
```

```json
{
  "presets": ["@babel/preset-env"]
}
```

### Code Formatting and Quality Tools

We will be using two tools in order to establish a standard that will be utilized by all project participants to maintain consistency in the coding style and the use of fundamental best practices:

- [Prettier](https://prettier.io/): A tool that will help us to format our code consistently.
- [ESLint](https://eslint.org/): A tool that will help us to enforce a consistent coding style.

#### Prettier

Prettier will handle the automated file formatting for us. Add it to the project right now.

It's only needed during development, so I'll add it as a `devDependency` with `-D`

```bash
yarn add -D prettier
```

Additionally, I advise getting the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) so that you may avoid using the command line tool and have VS Code take care of the file formatting for you. It's still required to include it here even when it's installed and set up in your project since VSCode will utilize your project's settings.

We'll create two files in the root:

- `.prettierrc`: This file will contain the configuration for prettier.
- `.prettierignore`: This file will contain the list of files that should be ignored by prettier.

`.prettierrc`

```json
{
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true
}
```

`.prettierignore`

```bash
node_modules
build
```

I've listed the folders in that file that I don't want Prettier to waste any time working on. If you'd want to disregard specific file types in groups, you may also use patterns like \*.html.

Now we add a new script to `package.json` so we can run Prettier:

`package.json`

```json
...
"scripts: {
  ...
  "prettier": "prettier --write \"src/**/*.js\"",
  "prettier:check": "prettier --check \"src/**/*.js\""
}
```

You can now run `yarn prettier` to format all files in the project, or `yarn prettier:check` to check if all files are formatted correctly.

```bash
yarn prettier:check
yarn prettier
```

to automatically format, repair, and save all files in your project that you haven't ignored. My formatter updated around 7 files by default. The source control tab on the left of VS Code has a list of altered files where you may find them.

#### ESLint

We'll begin with ESLint, which is a tool that will help us to enforce a consistent coding style, at first need to install the dependencies.

```bash
yarn add -D eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-prettier
```

We'll create two files in the root:

- `.eslintrc`: This file will contain the configuration for ESLint.
- `.eslintignore`: This file will contain the list of files that should be ignored by ESLint.

`.eslintrc`

```json
{
  "extends": [
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "import/no-named-as-default": "off",
    "no-underscore-dangle": "off"
  }
}
```

`.eslintignore`

```bash
node_modules
build
```

Now we add a new script to `package.json` so we can run ESLint:

`package.json`

```json
...
"scripts: {
  ...
  "lint": "eslint \"src/**/*.js\" --fix",
  "lint:check": "eslint \"src/**/*.js\""
}
```

You can test out your config by running:

You can now run `yarn lint` to format all files in the project, or `yarn lint:check` to check if all files are formatted correctly.

```bash
yarn lint:check
yarn lint
```

### Setup logger for development

I had a problem setting up the logger when constructing a server-side application based on Node and Express router. Conditions for the answer:

- Logging application event
- Ability to specify multiple logs level
- Logging of HTTP requests
- Ability to write logs into a different source (console and file)

I found two possible solutions:

- [Morgan](https://www.npmjs.com/package/morgan): HTTP logging middleware for express. It provides the ability to log incoming requests by specifying the formatting of log instance based on different request related information.
- [Winston](https://www.npmjs.com/package/winston): Multiple types of transports are supported by a lightweight yet effective logging library. Because I want to simultaneously log events into a file and a terminal, this practical feature is crucial for me.

I'll use Winston for the logging, first I'll install the package:

```bash
yarn add winston
```

Then I'll create a file called `utils/logger.util.js` in it:

```bash
touch src/utils/logger.util.js
```

```js
import winston from 'winston'
import { NODE_ENV } from '../env/variable.env'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const env = NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss:ms',
  }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/all.log' }),
]

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export default logger
```

### Build file structure and basic express application

at first we'll create a directory called `src`, and we'll build the file structure inside of it.

```bash
mkdir src
cd src

mkdir bin config constants controllers env middlewares models repositories routers schemas security services validations

```

for robust and don't repeat some text we'll create constants files in the `constants` directory:

```bash
touch src/constants/api.constant.js src/constants/dateformat.constant.js src/constants/http.code.constant.js src/constants/http.reason.constant.js src/constants/message.constant.js src/constants/model.constant.js src/constants/number.constant.js src/constants/path.constant.js src/constants/regex.constant.js
```

there are some constants that are used in the application, but that are not related to the application itself. For example, the constants that are used in the API are in the `api.constant.js` file, and there is a file that provides freely for HTTP codes and replies, but we'll make one from start.

`dateformat.constant.js`

```js
export const YYYY_MM_DD_HH_MM_SS_MS = 'YYYY-MM-DD HH:mm:ss:ms'

export default {
  YYYY_MM_DD_HH_MM_SS_MS,
}
```

`http.code.constant.js`

```js
export const CONTINUE = 100
export const SWITCHING_PROTOCOLS = 101
export const PROCESSING = 102
export const OK = 200
export const CREATED = 201
export const ACCEPTED = 202
export const NON_AUTHORITATIVE_INFORMATION = 203
export const NO_CONTENT = 204
export const RESET_CONTENT = 205
export const PARTIAL_CONTENT = 206
export const MULTI_STATUS = 207
export const ALREADY_REPORTED = 208
export const IM_USED = 226
export const MULTIPLE_CHOICES = 300
export const MOVED_PERMANENTLY = 301
export const MOVED_TEMPORARILY = 302
export const SEE_OTHER = 303
export const NOT_MODIFIED = 304
export const USE_PROXY = 305
export const SWITCH_PROXY = 306
export const TEMPORARY_REDIRECT = 307
export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const PAYMENT_REQUIRED = 402
export const FORBIDDEN = 403
export const NOT_FOUND = 404
export const METHOD_NOT_ALLOWED = 405
export const NOT_ACCEPTABLE = 406
export const PROXY_AUTHENTICATION_REQUIRED = 407
export const REQUEST_TIMEOUT = 408
export const CONFLICT = 409
export const GONE = 410
export const LENGTH_REQUIRED = 411
export const PRECONDITION_FAILED = 412
export const PAYLOAD_TOO_LARGE = 413
export const REQUEST_URI_TOO_LONG = 414
export const UNSUPPORTED_MEDIA_TYPE = 415
export const REQUESTED_RANGE_NOT_SATISFIABLE = 416
export const EXPECTATION_FAILED = 417
export const IM_A_TEAPOT = 418
export const METHOD_FAILURE = 420
export const MISDIRECTED_REQUEST = 421
export const UNPROCESSABLE_ENTITY = 422
export const LOCKED = 423
export const FAILED_DEPENDENCY = 424
export const UPGRADE_REQUIRED = 426
export const PRECONDITION_REQUIRED = 428
export const TOO_MANY_REQUESTS = 429
export const REQUEST_HEADER_FIELDS_TOO_LARGE = 431
export const UNAVAILABLE_FOR_LEGAL_REASONS = 451
export const INTERNAL_SERVER_ERROR = 500
export const NOT_IMPLEMENTED = 501
export const BAD_GATEWAY = 502
export const SERVICE_UNAVAILABLE = 503
export const GATEWAY_TIMEOUT = 504
export const HTTP_VERSION_NOT_SUPPORTED = 505
export const VARIANT_ALSO_NEGOTIATES = 506
export const INSUFFICIENT_STORAGE = 507
export const LOOP_DETECTED = 508
export const NOT_EXTENDED = 510
export const NETWORK_AUTHENTICATION_REQUIRED = 511
export const NETWORK_CONNECT_TIMEOUT_ERROR = 599

export default {
  CONTINUE,
  SWITCHING_PROTOCOLS,
  PROCESSING,
  OK,
  CREATED,
  ACCEPTED,
  NON_AUTHORITATIVE_INFORMATION,
  NO_CONTENT,
  RESET_CONTENT,
  PARTIAL_CONTENT,
  MULTI_STATUS,
  ALREADY_REPORTED,
  IM_USED,
  MULTIPLE_CHOICES,
  MOVED_PERMANENTLY,
  MOVED_TEMPORARILY,
  SEE_OTHER,
  NOT_MODIFIED,
  USE_PROXY,
  SWITCH_PROXY,
  TEMPORARY_REDIRECT,
  BAD_REQUEST,
  UNAUTHORIZED,
  PAYMENT_REQUIRED,
  FORBIDDEN,
  NOT_FOUND,
  METHOD_NOT_ALLOWED,
  NOT_ACCEPTABLE,
  PROXY_AUTHENTICATION_REQUIRED,
  REQUEST_TIMEOUT,
  CONFLICT,
  GONE,
  LENGTH_REQUIRED,
  PRECONDITION_FAILED,
  PAYLOAD_TOO_LARGE,
  REQUEST_URI_TOO_LONG,
  UNSUPPORTED_MEDIA_TYPE,
  REQUESTED_RANGE_NOT_SATISFIABLE,
  EXPECTATION_FAILED,
  IM_A_TEAPOT,
  METHOD_FAILURE,
  MISDIRECTED_REQUEST,
  UNPROCESSABLE_ENTITY,
  LOCKED,
  FAILED_DEPENDENCY,
  UPGRADE_REQUIRED,
  PRECONDITION_REQUIRED,
  TOO_MANY_REQUESTS,
  REQUEST_HEADER_FIELDS_TOO_LARGE,
  UNAVAILABLE_FOR_LEGAL_REASONS,
  INTERNAL_SERVER_ERROR,
  NOT_IMPLEMENTED,
  BAD_GATEWAY,
  SERVICE_UNAVAILABLE,
  GATEWAY_TIMEOUT,
  HTTP_VERSION_NOT_SUPPORTED,
  VARIANT_ALSO_NEGOTIATES,
  INSUFFICIENT_STORAGE,
  LOOP_DETECTED,
  NOT_EXTENDED,
  NETWORK_AUTHENTICATION_REQUIRED,
  NETWORK_CONNECT_TIMEOUT_ERROR,
}
```

`http.reason.constant.js`

```js
export const CONTINUE = 'Continue'
export const SWITCHING_PROTOCOLS = 'Switching Protocols'
export const PROCESSING = 'Processing'
export const OK = 'OK'
export const CREATED = 'Created'
export const ACCEPTED = 'Accepted'
export const NON_AUTHORITATIVE_INFORMATION = 'Non-Authoritative Information'
export const NO_CONTENT = 'No Content'
export const RESET_CONTENT = 'Reset Content'
export const PARTIAL_CONTENT = 'Partial Content'
export const MULTI_STATUS = 'Multi-Status'
export const ALREADY_REPORTED = 'Already Reported'
export const IM_USED = 'IM Used'
export const MULTIPLE_CHOICES = 'Multiple Choices'
export const MOVED_PERMANENTLY = 'Moved Permanently'
export const MOVED_TEMPORARILY = 'Moved Temporarily'
export const SEE_OTHER = 'See Other'
export const NOT_MODIFIED = 'Not Modified'
export const USE_PROXY = 'Use Proxy'
export const SWITCH_PROXY = 'Switch Proxy'
export const TEMPORARY_REDIRECT = 'Temporary Redirect'
export const BAD_REQUEST = 'Bad Request'
export const UNAUTHORIZED = 'Unauthorized'
export const PAYMENT_REQUIRED = 'Payment Required'
export const FORBIDDEN = 'Forbidden'
export const NOT_FOUND = 'Not Found'
export const METHOD_NOT_ALLOWED = 'Method Not Allowed'
export const NOT_ACCEPTABLE = 'Not Acceptable'
export const PROXY_AUTHENTICATION_REQUIRED = 'Proxy Authentication Required'
export const REQUEST_TIMEOUT = 'Request Timeout'
export const CONFLICT = 'Conflict'
export const GONE = 'Gone'
export const LENGTH_REQUIRED = 'Length Required'
export const PRECONDITION_FAILED = 'Precondition Failed'
export const PAYLOAD_TOO_LARGE = 'Payload Too Large'
export const REQUEST_URI_TOO_LONG = 'Request URI Too Long'
export const UNSUPPORTED_MEDIA_TYPE = 'Unsupported Media Type'
export const REQUESTED_RANGE_NOT_SATISFIABLE = 'Requested Range Not Satisfiable'
export const EXPECTATION_FAILED = 'Expectation Failed'
export const IM_A_TEAPOT = "I'm a teapot"
export const METHOD_FAILURE = 'Method Failure'
export const MISDIRECTED_REQUEST = 'Misdirected Request'
export const UNPROCESSABLE_ENTITY = 'Unprocessable Entity'
export const LOCKED = 'Locked'
export const FAILED_DEPENDENCY = 'Failed Dependency'
export const UPGRADE_REQUIRED = 'Upgrade Required'
export const PRECONDITION_REQUIRED = 'Precondition Required'
export const TOO_MANY_REQUESTS = 'Too Many Requests'
export const REQUEST_HEADER_FIELDS_TOO_LARGE = 'Request Header Fields Too Large'
export const UNAVAILABLE_FOR_LEGAL_REASONS = 'Unavailable For Legal Reasons'
export const INTERNAL_SERVER_ERROR = 'Internal Server Error'
export const NOT_IMPLEMENTED = 'Not Implemented'
export const BAD_GATEWAY = 'Bad Gateway'
export const SERVICE_UNAVAILABLE = 'Service Unavailable'
export const GATEWAY_TIMEOUT = 'Gateway Timeout'
export const HTTP_VERSION_NOT_SUPPORTED = 'HTTP Version Not Supported'
export const VARIANT_ALSO_NEGOTIATES = 'Variant Also Negotiates'
export const INSUFFICIENT_STORAGE = 'Insufficient Storage'
export const LOOP_DETECTED = 'Loop Detected'
export const NOT_EXTENDED = 'Not Extended'
export const NETWORK_AUTHENTICATION_REQUIRED = 'Network Authentication Required'
export const NETWORK_CONNECT_TIMEOUT_ERROR = 'Network Connect Timeout Error'

export default {
  CONTINUE,
  SWITCHING_PROTOCOLS,
  PROCESSING,
  OK,
  CREATED,
  ACCEPTED,
  NON_AUTHORITATIVE_INFORMATION,
  NO_CONTENT,
  RESET_CONTENT,
  PARTIAL_CONTENT,
  MULTI_STATUS,
  ALREADY_REPORTED,
  IM_USED,
  MULTIPLE_CHOICES,
  MOVED_PERMANENTLY,
  MOVED_TEMPORARILY,
  SEE_OTHER,
  NOT_MODIFIED,
  USE_PROXY,
  SWITCH_PROXY,
  TEMPORARY_REDIRECT,
  BAD_REQUEST,
  UNAUTHORIZED,
  PAYMENT_REQUIRED,
  FORBIDDEN,
  NOT_FOUND,
  METHOD_NOT_ALLOWED,
  NOT_ACCEPTABLE,
  PROXY_AUTHENTICATION_REQUIRED,
  REQUEST_TIMEOUT,
  CONFLICT,
  GONE,
  LENGTH_REQUIRED,
  PRECONDITION_FAILED,
  PAYLOAD_TOO_LARGE,
  REQUEST_URI_TOO_LONG,
  UNSUPPORTED_MEDIA_TYPE,
  REQUESTED_RANGE_NOT_SATISFIABLE,
  EXPECTATION_FAILED,
  IM_A_TEAPOT,
  METHOD_FAILURE,
  MISDIRECTED_REQUEST,
  UNPROCESSABLE_ENTITY,
  LOCKED,
  FAILED_DEPENDENCY,
  UPGRADE_REQUIRED,
  PRECONDITION_REQUIRED,
  TOO_MANY_REQUESTS,
  REQUEST_HEADER_FIELDS_TOO_LARGE,
  UNAVAILABLE_FOR_LEGAL_REASONS,
  INTERNAL_SERVER_ERROR,
  NOT_IMPLEMENTED,
  BAD_GATEWAY,
  SERVICE_UNAVAILABLE,
  GATEWAY_TIMEOUT,
  HTTP_VERSION_NOT_SUPPORTED,
  VARIANT_ALSO_NEGOTIATES,
  INSUFFICIENT_STORAGE,
  LOOP_DETECTED,
  NOT_EXTENDED,
  NETWORK_AUTHENTICATION_REQUIRED,
  NETWORK_CONNECT_TIMEOUT_ERROR,
}
```

`path.constant.js`

```js
export const LOGS_ALL = 'logs/all.log'
export const LOGS_ERROR = 'logs/error.log'

export default {
  LOGS_ALL,
  LOGS_ERROR,
}
```

and we'll add to other constants in the future.

after creating the directory structure, we'll create a file called `.env` and `.env.example` in the root directory:

- `.env`: This file will contain the configuration for the application.
- `.env.example`: is the file that contains all of the configurations for constants that `.env` has, but without values; only this one is versioned. `env.example` serves as a template for building a `.env` file that contains the information required to start the program.

```bash
cd ..

touch .env .env.example
```

Now we add a new variable to `.env`:

`.env`

```bash
NODE_ENV=development
# NODE_ENV=production
PORT=3030
DATABASE_URL=mongodb://127.0.0.1:27017/example
```

`.env.example`

```bash
NODE_ENV=development
# NODE_ENV=production
PORT=3030
DATABASE_URL=mongodb://
```

after creating the directory structure and `.env` files, we'll create a file called `index.js`, `bin/www.js`, `config/db.config.js` and `env/variable.env.js` in the `src` directory.

```bash
touch src/index.js src/bin/www.js src/config/db.config.js src/env/variable.env.js
```

new files will be created in the `src` directory, and we'll add the following code to each of them:

`db.config.js`

```js
import { connect } from 'mongoose'
import logger from '../utils/logger.util'

const connectDb = async (URL) => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  try {
    const connection = await connect(URL, connectionParams)
    logger.info(`Mongo DB is connected to: ${connection.connection.host}`)
  } catch (err) {
    logger.error(`An error ocurred\n\r\n\r${err}`)
  }
}

export default connectDb
```

`variable.env.js`

```js
import dotenv from 'dotenv'

dotenv.config()

export const { NODE_ENV } = process.env
export const { PORT } = process.env
export const { DATABASE_URL } = process.env

export default {
  NODE_ENV,
  PORT,
  DATABASE_URL,
}
```

`index.js`

```js
import express from 'express'
import cors from 'cors'

import { DATABASE_URL } from './env/variable.env'
import connectDb from './config/db.config'

//http constant
import ConstantHttpCode from './constants/http.code.constant'
import ConstantHttpReason from './constants/http.reason.constant'

connectDb(DATABASE_URL)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res, next) => {
  try {
    res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      API: 'Work',
    })
  } catch (err) {
    next(err)
  }
})

export default app
```

`bin/www.js`

```js
#!/user/bin/env node

import http from 'http'
import app from '..'

import { PORT } from '../env/variable.env'
import logger from '../utils/logger.util'

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

const port = normalizePort(PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  logger.info(`Listening on ${bind}`)
}

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
```

Now we add a new script to `package.json` so we can run the application:

```json
...
"scripts: {
  ...
  "start": "node build/bin/www.js",
  "dev": "nodemon --exec babel-node src/bin/www.js",
  "clean": "rm -rf build",
  "build": "yarn clean && npx babel src -d build --minified --presets @babel/preset-env",
  ...
}
```

New you can run the application with `yarn start` or `yarn dev`, and you can also run the application with `yarn build` to create a production version.

```bash
yarn dev

yarn start

yarn build
```

New we'll add a new package:

[compression](https://www.npmjs.com/package/compression): Your Node.js app's main file contains middleware for `compression`. GZIP, which supports a variety of `compression` techniques, will then be enabled. Your JSON response and any static file replies will be smaller as a result.

```bash
yarn add compression
```

[cookie-parser](https://www.npmjs.com/package/cookie-parser): Your Node.js app's main file contains middleware for `cookie-parser`. This middleware will parse the cookies in the request and set them as properties of the request object.

```bash
yarn add cookie-parser
```

[core-js](https://www.npmjs.com/package/core-js): Your Node.js app's main file contains middleware for `core-js`. This middleware will add the necessary polyfills to your application.

```bash
yarn add core-js
```

[helmet](https://www.npmjs.com/package/helmet): Your Node.js app's main file contains middleware for `helmet`. This middleware will add security headers to your application.

```bash
yarn add helmet
```

[regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime): Your Node.js app's main file contains middleware for `regenerator-runtime`. This middleware will add the necessary polyfills to your application.

```bash
yarn add regenerator-runtime
```

we'll change the `index.js` file:

```js
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import { DATABASE_URL } from './env/variable.env'
import connectDb from './config/db.config'

//http constant
import ConstantHttpCode from './constants/http.code.constant'
import ConstantHttpReason from './constants/http.reason.constant'

connectDb(DATABASE_URL)

const app = express()

//helmet
app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use(cors())
app.use(cookieParser())

app.get('/', (req, res, next) => {
  try {
    res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      API: 'Work',
    })
  } catch (err) {
    next(err)
  }
})

export default app
```

and we'll change the `bin/www.js` file:

```js
#!/user/bin/env node
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import http from 'http'
import app from '..'

import { PORT } from '../env/variable.env'
import logger from '../utils/logger.util'

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (Number.isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

const port = normalizePort(PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  logger.info(`Listening on ${bind}`)
}

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
```

new we'll run the application with `yarn dev`:

```bash
╭─mkabumattar@mkabumattar in ~/work/tutorial is  v0.0.0 via  v18.3.0 took 243ms
╰─λ yarn dev
yarn run v1.22.18
$ nodemon --exec babel-node src/bin/www.js
[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node src/bin/www.js`
2022-06-25 11:57:38:5738 info: Listening on port 3030
2022-06-25 11:57:38:5738 info: Mongo DB is connected to: 127.0.0.1
```

## Git Hooks

Before moving on to component development, there is one more section on configuration. If you want to expand on this project in the future, especially with a team of other developers, keep in mind that you'll want it to be as stable as possible. To get it right from the beginning is time well spent.

We're going to use a program called [Husky](https://husky.run/).

### Husky

Husky is a tool for executing scripts at various git stages, such as add, commit, push, etc. We would like to be able to specify requirements and, provided our project is of acceptable quality, only enable actions like commit and push to proceed if our code satisfies those requirements.

To install Husky run

```bash
yarn add husky

git init

npx husky install
```

add `.gitignore` file:

```bash
touch .gitignore
```

`.gitignore`

```yaml
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# vuepress build output
.vuepress/dist

# vuepress v2.x temp and cache directory
.temp
.cache

# Docusaurus cache and generated files
.docusaurus

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*
```

A `.husky` directory will be created in your project by the second command. Your hooks will be located here. As it is meant for other developers as well as yourself, make sure this directory is included in your code repository.

Add the following script to your `package.json` file:

`package.json`

```json
...
"scripts: {
  ...
  "prepare": "husky install"
}
```

This will ensure Husky gets installed automatically when other developers run the project.

To create a hook run:

```bash
npx husky add .husky/pre-commit "yarn lint"
```

The aforementioned states that the `yarn lint` script must run and be successful before our commit may be successful. Success here refers to the absence of mistakes. You will be able to get warnings (remember in the ESLint config a setting of 1 is a warning and 2 is an error in case you want to adjust settings).

We're going to add another one:

```bash
npx husky add .husky/pre-push "yarn build"
```

This makes sure that we can't push to the remote repository until our code has built correctly. That sounds like a very acceptable requirement, don't you think? By making this adjustment and attempting to push, feel free to test it.

### Commitlint

Finally, we'll add one more tool. Let's make sure that everyone on the team is adhering to them as well (including ourselves! ), since we have been using a uniform format for all of our commit messages so far. For our commit messages, we may add a linter.

```bash
yarn add -D @commitlint/config-conventional @commitlint/cli
```

We will configure it using a set of common defaults, but since I occasionally forget what prefixes are available, I like to explicitly provide that list in a `commitlint.config.js` file:

```bash
touch commitlint.config.js
```

`commitlint.config.js`

```js
// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
        'changeset',
      ],
    ],
  },
}
```

Afterward, use Husky to enable commitlint by using:

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

Know connected this repository with GitHub, you can now push your commits to GitHub.

```bash
echo "# Setting up Node JS, Express, MongoDB, Prettier, ESLint and Husky Application with Babel and authentication as an example" >> README.md
git init
git add README.md
git commit -m "ci: Initial commit"
git branch -M main
git remote add origin git@github.com:<your-github-username>/<your-github-repository-name>.git
git push -u origin main
```

## VS Code

### Configuration

We can now take advantage of some useful VS Code functionality to have ESLint and Prettier run automatically since we have implemented them.

Make a `settings.json` file and a directory called `.vscode` at the top of your project. This will be a list of values that overrides the VS Code installation's default settings.

Because we may set up particular parameters that only apply to this project and share them with the rest of our team by adding them to the code repository, we want to put them in a folder for the project.

Within `settings.json` we will add the following values:

```bash
mkdir .vscode
touch .vscode/settings.json
```

`settings.json`

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  }
}
```

### Debugging

In case we encounter any problems while developing our program, let's set up a handy environment for debugging.

Inside of your `.vscode` directory create a `launch.json` file:

```bash
touch .vscode/launch.json
```

`launch.json`

```json
{
  "version": "0.1.0",
  "configurations": [
    {
      "name": "debug server",
      "type": "node-terminal",
      "request": "launch",
      "command": "yarn dev"
    }
  ]
}
```

## Authentication

### Authentication Setup

We'll add a new packages to our project:

- [crypto-js](https://www.npmjs.com/package/crypto-js): A JavaScript library for encryption and decryption.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): A JavaScript library for creating and verifying JSON Web Tokens.

```bash
yarn add crypto-js jsonwebtoken
```

add secret key to `.env` file:

`.env`

```bash
...
JWT_SECRET=secret
PASS_SECRET=secret
```

add `JWT_SECRET` and `PASS_SECRET` to `variable.env.js` file:

`variable.env.js`

```js
...

export const { JWT_SECRET } = process.env
export const { PASS_SECRET } = process.env

export default {
  ...,
  JWT_SECRET,
  PASS_SECRET,
}
```

know we'll add the constants to:

`api.constant.js`

```js
// api
export const API_AUTH = '/api/auth'
export const API_USERS = '/api/users'

// auth
export const AUTH_REGISTER = '/register'
export const AUTH_LOGIN = '/login'

// users
export const USER_UPDATE_USERNAME = '/update-username/:id'
export const USER_UPDATE_NAME = '/update-name/:id'
export const USER_UPDATE_EMAIL = '/update-email/:id'
export const USER_UPDATE_PASSWORD = '/update-password/:id'
export const USER_UPDATE_PHONE = '/update-phone/:id'
export const USER_UPDATE_ADDRESS = '/update-address/:id'
export const USER_DELETE = '/delete/:id'
export const USER_GET = '/find/:id'
export const USER_GET_ALL = '/'
export const USER_GET_ALL_STATS = '/stats'

export default {
  // api
  API_AUTH,
  API_USERS,

  // auth
  AUTH_REGISTER,
  AUTH_LOGIN,

  // users
  USER_UPDATE_USERNAME,
  USER_UPDATE_NAME,
  USER_UPDATE_EMAIL,
  USER_UPDATE_PASSWORD,
  USER_UPDATE_PHONE,
  USER_UPDATE_ADDRESS,
  USER_DELETE,
  USER_GET,
  USER_GET_ALL,
  USER_GET_ALL_STATS,
}
```

`message.constant.js`

```js
// token
export const TOKEN_NOT_VALID = 'Token not valid'
export const NOT_AUTHENTICATED = 'Not authenticated'
export const NOT_ALLOWED = 'Not allowed'

// auth
export const USERNAME_NOT_VALID = 'username is not valid'
export const NAME_NOT_VALID = 'name is not valid'
export const EMAIL_NOT_VALID = 'email is not valid'
export const PASSWORD_NOT_VALID = 'password is not valid'
export const PHONE_NOT_VALID = 'phone is not valid'
export const ADDRESS_NOT_VALID = 'address is not valid'
export const USERNAME_EXIST = 'username is exist'
export const EMAIL_EXIST = 'email is exist'
export const PHONE_EXIST = 'phone is exist'
export const USER_NOT_CREATE = 'user is not create, please try again'
export const USER_CREATE_SUCCESS = 'user is create success, please login'
export const USER_NOT_FOUND = 'user is not found'
export const PASSWORD_NOT_MATCH = 'password is not match'
export const USER_LOGIN_SUCCESS = 'user is login success'

// user
export const USERNAME_NOT_CHANGE = 'username is not change'
export const USERNAME_CHANGE_SUCCESS = 'username is change success'
export const NAME_NOT_CHANGE = 'name is not change'
export const NAME_CHANGE_SUCCESS = 'name is change success'
export const EMAIL_NOT_CHANGE = 'email is not change'
export const EMAIL_CHANGE_SUCCESS = 'email is change success'
export const PASSWORD_NOT_CHANGE = 'password is not change'
export const PASSWORD_CHANGE_SUCCESS = 'password is change success'
export const PHONE_NOT_CHANGE = 'phone is not change'
export const PHONE_CHANGE_SUCCESS = 'phone is change success'
export const ADDRESS_NOT_CHANGE = 'address is not change'
export const ADDRESS_CHANGE_SUCCESS = 'address is change success'
export const USER_NOT_DELETE = 'user is not delete, please try again'
export const USER_DELETE_SUCCESS = 'user is delete success'
export const USER_FOUND = 'user is found'

export default {
  // token
  TOKEN_NOT_VALID,
  NOT_AUTHENTICATED,
  NOT_ALLOWED,

  // auth
  USERNAME_NOT_VALID,
  NAME_NOT_VALID,
  EMAIL_NOT_VALID,
  PASSWORD_NOT_VALID,
  PHONE_NOT_VALID,
  ADDRESS_NOT_VALID,
  USERNAME_EXIST,
  EMAIL_EXIST,
  PHONE_EXIST,
  USER_NOT_CREATE,
  USER_CREATE_SUCCESS,
  USER_NOT_FOUND,
  PASSWORD_NOT_MATCH,
  USER_LOGIN_SUCCESS,

  // user
  USERNAME_NOT_CHANGE,
  USERNAME_CHANGE_SUCCESS,
  NAME_NOT_CHANGE,
  NAME_CHANGE_SUCCESS,
  EMAIL_NOT_CHANGE,
  EMAIL_CHANGE_SUCCESS,
  PASSWORD_NOT_CHANGE,
  PASSWORD_CHANGE_SUCCESS,
  PHONE_NOT_CHANGE,
  PHONE_CHANGE_SUCCESS,
  ADDRESS_NOT_CHANGE,
  ADDRESS_CHANGE_SUCCESS,
  USER_NOT_DELETE,
  USER_DELETE_SUCCESS,
  USER_FOUND,
}
```

`model.constant.js`

```js
export const USER_MODEL = 'UserModel'

export default {
  USER_MODEL,
}
```

`number.constant.js`

```js
// user
export const USERNAME_MIN_LENGTH = 3
export const USERNAME_MAX_LENGTH = 20
export const NAME_MIN_LENGTH = 3
export const NAME_MAX_LENGTH = 80
export const EMAIL_MAX_LENGTH = 50
export const PASSWORD_MIN_LENGTH = 8
export const PHONE_MIN_LENGTH = 10
export const PHONE_MAX_LENGTH = 20
export const ADDRESS_MIN_LENGTH = 10
export const ADDRESS_MAX_LENGTH = 200

export default {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PHONE_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  ADDRESS_MIN_LENGTH,
  ADDRESS_MAX_LENGTH,
}
```

`regex.constant.js`

```js
export const USERNAME = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,32}$/
export const EMAIL =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
export const NAME = /^[a-zA-Z ]{2,35}$/
export const PHONE =
  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm
export const ADDRESS = /^[a-zA-Z0-9\s,'-]{10,200}$/

export default {
  USERNAME,
  EMAIL,
  PASSWORD,
  NAME,
  PHONE,
  ADDRESS,
}
```

### Authentication Middleware

`token.middleware.js`

```js
import jwt from 'jsonwebtoken'

import ConstantMessage from '../constants/message.constant'
import { JWT_SECRET } from '../env/variable.env'

// http constant
import ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'

// logger
import logger from '../utils/logger.util'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token
  logger.info(`authHeader: ${authHeader}`)
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    return jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        res.status(ConstantHttpCode.FORBIDDEN).json({
          status: {
            code: ConstantHttpCode.FORBIDDEN,
            msg: ConstantHttpReason.FORBIDDEN,
          },
          msg: ConstantMessage.TOKEN_NOT_VALID,
        })
      }
      req.user = user
      return next()
    })
  }

  return res.status(ConstantHttpCode.UNAUTHORIZED).json({
    status: {
      code: ConstantHttpCode.UNAUTHORIZED,
      msg: ConstantHttpReason.UNAUTHORIZED,
    },
    msg: ConstantMessage.NOT_AUTHENTICATED,
  })
}

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      return next()
    }

    return res.status(ConstantHttpCode.FORBIDDEN).json({
      status: {
        code: ConstantHttpCode.FORBIDDEN,
        msg: ConstantHttpReason.FORBIDDEN,
      },
      msg: ConstantMessage.NOT_ALLOWED,
    })
  })
}

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next()
    }

    return res.status(ConstantHttpCode.FORBIDDEN).json({
      status: {
        code: ConstantHttpCode.FORBIDDEN,
        msg: ConstantHttpReason.FORBIDDEN,
      },
      msg: ConstantMessage.NOT_ALLOWED,
    })
  })
}

export default {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
}
```

### Authentication Security

`user.security.js`

```js
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

import { JWT_SECRET, PASS_SECRET } from '../env/variable.env'

export const encryptedPassword = (password) => {
  return CryptoJS.AES.encrypt(password, PASS_SECRET).toString()
}

export const decryptedPassword = (password) => {
  return CryptoJS.AES.decrypt(password, PASS_SECRET).toString(CryptoJS.enc.Utf8)
}

export const comparePassword = (password, dPassword) => {
  const compare = decryptedPassword(dPassword) === password
  return compare
}

export const generateAccessToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, JWT_SECRET, { expiresIn: '3d' })
}

export default {
  encryptedPassword,
  decryptedPassword,
  comparePassword,
  generateAccessToken,
}
```

### Authentication validations

`user.validation.js`

```js
import ConstantRegex from '../constants/regex.constant'

export const validateUsername = async (username) => {
  return ConstantRegex.USERNAME.test(username)
}

export const validateName = async (name) => {
  return ConstantRegex.NAME.test(name)
}

export const validateEmail = async (email) => {
  return ConstantRegex.EMAIL.test(email)
}

export const validatePassword = async (password) => {
  return ConstantRegex.PASSWORD.test(password)
}

export const validatePhone = async (phone) => {
  return ConstantRegex.PHONE.test(phone)
}

export const validateAddress = async (address) => {
  return ConstantRegex.ADDRESS.test(address)
}

export default {
  validateUsername,
  validateName,
  validateEmail,
  validatePassword,
  validatePhone,
  validateAddress,
}
```

### Authentication schemas

`user.schema.js`

```js
import mongoose from 'mongoose'
import ConstantNumber from '../constants/number.constant'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: ConstantNumber.USERNAME_MIN_LENGTH,
      max: ConstantNumber.USERNAME_MAX_LENGTH,
    },
    name: {
      type: String,
      required: true,
      min: ConstantNumber.NAME_MIN_LENGTH,
      max: ConstantNumber.NAME_MAX_LENGTH,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: ConstantNumber.EMAIL_MAX_LENGTH,
    },
    password: {
      type: String,
      required: true,
      min: ConstantNumber.PASSWORD_MIN_LENGTH,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      min: ConstantNumber.PHONE_MIN_LENGTH,
      max: ConstantNumber.PHONE_MAX_LENGTH,
    },
    address: {
      type: String,
      required: true,
      min: ConstantNumber.ADDRESS_MIN_LENGTH,
      max: ConstantNumber.ADDRESS_MAX_LENGTH,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

export default UserSchema
```

### Authentication Models

`user.model.js`

```js
import mongoose from 'mongoose'
import UserSchema from '../schemas/user.schema'

import ConstantModel from '../constants/model.constant'

const UserModel = mongoose.model(ConstantModel.USER_MODEL, UserSchema)

export default UserModel
```

### Authentication Repositories

`user.repository.js`

```js
import User from '../models/user.model'

export const findAll = async () => {
  const users = await User.find({}).select('-password')
  return users
}

export const findById = async (id) => {
  const user = await User.findById(id).select('-password')
  return user
}

export const findByIdWithPassword = async (id) => {
  const user = await User.findById(id)
  return user
}

export const findByUser = async (username) => {
  const user = await User.findOne({ username }).select('-password')
  return user
}

export const findByEmail = async (email) => {
  const user = await User.findOne({ email }).select('-password')
  return user
}

export const findByEmailWithPassword = async (email) => {
  const user = await User.findOne({ email })
  return user
}

export const findByPhone = async (phone) => {
  const user = await User.findOne({ phone }).select('-password')
  return user
}

export const createUser = async (user) => {
  const newUser = new User({
    username: user.username,
    name: user.name,
    email: user.email,
    password: user.password,
    phone: user.phone,
    address: user.address,
    isAdmin: user.isAdmin,
  })
  const savedUser = await newUser.save()
  return savedUser
}

export const updateUsername = async (id, username) => {
  const user = await User.findByIdAndUpdate(
    id,
    { username },
    { new: true },
  ).select('-password')
  return user
}

export const updateName = async (id, name) => {
  const user = await User.findByIdAndUpdate(id, { name }, { new: true }).select(
    '-password',
  )
  return user
}

export const updateEmail = async (id, email) => {
  const user = await User.findByIdAndUpdate(
    id,
    { email },
    { new: true },
  ).select('-password')
  return user
}

export const updatePassword = async (id, password) => {
  const user = await User.findByIdAndUpdate(
    id,
    { password },
    { new: true },
  ).select('-password')
  return user
}

export const updatePhone = async (id, phone) => {
  const user = await User.findByIdAndUpdate(
    id,
    { phone },
    { new: true },
  ).select('-password')
  return user
}

export const updateAddress = async (id, address) => {
  const user = await User.findByIdAndUpdate(
    id,
    { address },
    { new: true },
  ).select('-password')
  return user
}

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id)
  return user
}

export const getUsersStats = async (lastYear) => {
  const users = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ])
  return users
}

export default {
  findAll,
  findById,
  findByIdWithPassword,
  findByUser,
  findByEmail,
  findByEmailWithPassword,
  findByPhone,
  createUser,
  updateUsername,
  updateName,
  updateEmail,
  updatePassword,
  updatePhone,
  updateAddress,
  deleteUser,
  getUsersStats,
}
```

### Authentication Services

`auth.service.js`

```js
import UserRepository from '../repositories/user.repository'
import UserSecurity from '../security/user.security'
import UserValidation from '../validations/user.validation'

export const validateUsername = (username) => {
  return UserValidation.validateUsername(username)
}

export const validateName = (name) => {
  return UserValidation.validateName(name)
}

export const validateEmail = (email) => {
  return UserValidation.validateEmail(email)
}

export const validatePassword = (password) => {
  return UserValidation.validatePassword(password)
}

export const comparePassword = (password, encryptedPassword) => {
  return UserSecurity.comparePassword(password, encryptedPassword)
}

export const validatePhone = (phone) => {
  return UserValidation.validatePhone(phone)
}

export const validateAddress = (address) => {
  return UserValidation.validateAddress(address)
}

export const findByUser = async (username) => {
  const user = await UserRepository.findByUser(username)
  return user
}

export const findByEmail = async (email) => {
  const user = await UserRepository.findByEmailWithPassword(email)
  return user
}

export const findByPhone = async (phone) => {
  const user = await UserRepository.findByPhone(phone)
  return user
}

export const createUser = async (user) => {
  const encryptedPassword = UserSecurity.encryptedPassword(user.password)
  const newUser = {
    username: user.username,
    name: user.name,
    email: user.email,
    password: encryptedPassword,
    phone: user.phone,
    address: user.address,
    isAdmin: user.isAdmin,
  }
  const savedUser = await UserRepository.createUser(newUser)
  return savedUser
}

export const generateAccessToken = async (user) => {
  return `Bearer ${UserSecurity.generateAccessToken(user.id, user.isAdmin)}`
}

export default {
  validateUsername,
  validateName,
  validateEmail,
  validatePassword,
  comparePassword,
  validatePhone,
  validateAddress,
  findByUser,
  findByEmail,
  findByPhone,
  createUser,
  generateAccessToken,
}
```

`user.service.js`

```js
import UserRepository from '../repositories/user.repository'
import UserSecurity from '../security/user.security'
import UserValidation from '../validations/user.validation'

export const validateUsername = (username) => {
  return UserValidation.validateUsername(username)
}

export const validateName = (name) => {
  return UserValidation.validateName(name)
}

export const validateEmail = (email) => {
  return UserValidation.validateEmail(email)
}

export const validatePassword = (name) => {
  return UserValidation.validatePassword(name)
}

export const comparePassword = (password, encryptedPassword) => {
  return UserSecurity.comparePassword(password, encryptedPassword)
}

export const validatePhone = (phone) => {
  return UserValidation.validatePhone(phone)
}

export const validateAddress = (address) => {
  return UserValidation.validateAddress(address)
}

export const findAll = async () => {
  const users = await UserRepository.findAll()
  return users
}

export const findById = async (id) => {
  const user = await UserRepository.findByIdWithPassword(id)
  return user
}

export const findByIdWithOutPassword = async (id) => {
  const user = await UserRepository.findById(id)
  return user
}

export const findByEmail = async (email) => {
  const user = await UserRepository.findByEmail(email)
  return user
}

export const findByPhone = async (phone) => {
  const user = await UserRepository.findByPhone(phone)
  return user
}

export const findByUser = async (username) => {
  const user = await UserRepository.findByUser(username)
  return user
}

export const updateUsername = async (id, username) => {
  const user = await UserRepository.updateUsername(id, username)
  return user
}

export const updateName = async (id, name) => {
  const user = await UserRepository.updateName(id, name)
  return user
}

export const updateEmail = async (id, email) => {
  const user = await UserRepository.updateEmail(id, email)
  return user
}

export const updatePassword = async (id, password) => {
  const encryptedPassword = UserSecurity.encryptedPassword(password)
  const user = await UserRepository.updatePassword(id, encryptedPassword)
  return user
}

export const updatePhone = async (id, phone) => {
  const user = await UserRepository.updatePhone(id, phone)
  return user
}

export const updateAddress = async (id, address) => {
  const user = await UserRepository.updateAddress(id, address)
  return user
}

export const deleteUser = async (id) => {
  const user = await UserRepository.deleteUser(id)
  return user
}

export const getUsersStats = async () => {
  const users = await UserRepository.getUsersStats()
  return users
}

export default {
  validateUsername,
  validateName,
  validateEmail,
  validatePassword,
  comparePassword,
  validatePhone,
  validateAddress,
  findAll,
  findById,
  findByIdWithOutPassword,
  findByEmail,
  findByPhone,
  findByUser,
  updateUsername,
  updateName,
  updateEmail,
  updatePassword,
  updatePhone,
  updateAddress,
  deleteUser,
  getUsersStats,
}
```

### Authentication Controllers

`auth.controller.js`

```js
import ConstantMessage from '../constants/message.constant'
import AuthServices from '../services/auth.service'

// http constant
import ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'

// logger
import logger from '../utils/logger.util'

export const register = async (req, res, next) => {
  try {
    const { username, name, email, password, phone, address } = req.body

    const usernameValidated = AuthServices.validateUsername(username)
    if (!usernameValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USERNAME_NOT_VALID,
      })
    }
    logger.info(`username ${username} is valid`)

    const nameValidated = AuthServices.validateName(name)
    if (!nameValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.NAME_NOT_VALID,
      })
    }
    logger.info(`name ${name} is valid`)

    const emailValidated = AuthServices.validateEmail(email)
    if (!emailValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_NOT_VALID,
      })
    }
    logger.info(`email ${email} is valid`)

    const passwordValidated = AuthServices.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }

    const phoneValidated = AuthServices.validatePhone(phone)
    if (!phoneValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_NOT_VALID,
      })
    }

    const addressValidated = AuthServices.validateAddress(address)
    if (!addressValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.ADDRESS_NOT_VALID,
      })
    }

    const usernameCheck = await AuthServices.findByUser(username)
    if (usernameCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USERNAME_EXIST,
      })
    }

    const emailCheck = await AuthServices.findByEmail(email)
    if (emailCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_EXIST,
      })
    }

    const phoneCheck = await AuthServices.findByPhone(phone)
    if (phoneCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_EXIST,
      })
    }

    const newUserData = {
      username,
      name,
      email,
      password,
      phone,
      address,
    }

    const user = await AuthServices.createUser(newUserData)
    if (!user) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USER_NOT_CREATE,
      })
    }

    const newUser = { ...user }._doc

    logger.info({ newUserpassword: newUser.password })

    delete newUser.password

    logger.info({ newUserpassword: newUser.password })

    return res.status(ConstantHttpCode.CREATED).json({
      status: {
        code: ConstantHttpCode.CREATED,
        msg: ConstantHttpReason.CREATED,
      },
      msg: ConstantMessage.USER_CREATE_SUCCESS,
      data: user,
    })
  } catch (err) {
    return next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const emailValidated = AuthServices.validateEmail(email)
    if (!emailValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_NOT_VALID,
      })
    }

    const passwordValidated = AuthServices.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }

    const user = await AuthServices.findByEmail(email)
    if (!user) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }

    const isMatch = AuthServices.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }

    const accessToken = await AuthServices.generateAccessToken(user)
    logger.info(`accessToken: ${accessToken}`)

    const newUser = { ...user }._doc

    logger.info({ newUserpassword: newUser.password })

    delete newUser.password

    logger.info({ newUserpassword: newUser.password })

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.LOGIN_SUCCESS,
      data: {
        user,
        accessToken,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export default {
  register,
  login,
}
```

`user.controller.js`

```js
import ConstantMessage from '../constants/message.constant'
import UserService from '../services/user.service'

// http constant
import ConstantHttpCode from '../constants/http.code.constant'
import ConstantHttpReason from '../constants/http.reason.constant'

// logger
import logger from '../utils/logger.util'

export const updateUsername = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const usernameValidated = UserService.validateUsername(username)
    if (!usernameValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USERNAME_NOT_VALID,
      })
    }
    logger.info(`username ${username} is valid`)

    const passwordValidated = UserService.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${password} is valid`)

    const isMatch = UserService.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }

    const usernameCheck = await UserService.findByUser(username)
    if (usernameCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USERNAME_EXIST,
      })
    }

    if (user.username === username) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USERNAME_NOT_CHANGE,
      })
    }

    const updatedUser = await UserService.updateUsername(id, username)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USERNAME_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.USERNAME_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const updateName = async (req, res, next) => {
  try {
    const { name, password } = req.body
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const nameValidated = UserService.validateName(name)
    if (!nameValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.NAME_NOT_VALID,
      })
    }

    const passwordValidated = UserService.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }

    const isMatch = UserService.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }
    logger.info(`password ${password} is valid`)

    if (user.name === name) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.NAME_NOT_CHANGE,
      })
    }
    logger.info(`name ${name} is valid`)

    const updatedUser = await UserService.updateName(id, name)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.NAME_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.NAME_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const updateEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const emailValidated = UserService.validateEmail(email)
    if (!emailValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_NOT_VALID,
      })
    }
    logger.info(`email ${email} is valid`)

    const passwordValidated = UserService.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${password} is valid`)

    const isMatch = UserService.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }
    logger.info(`password ${password} is valid`)

    if (user.email === email) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_NOT_CHANGE,
      })
    }
    logger.info(`email ${email} is valid`)

    const emailCheck = await UserService.findByEmail(email)
    if (emailCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_EXIST,
      })
    }

    const updatedUser = await UserService.updateEmail(id, email)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.EMAIL_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.EMAIL_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body
    const { id } = req.params

    if (newPassword !== confirmPassword) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const oldPasswordValidated = UserService.validatePassword(oldPassword)
    if (!oldPasswordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${oldPassword} is valid`)

    const newPasswordValidated = UserService.validatePassword(newPassword)
    if (!newPasswordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${newPassword} is valid`)

    const confirmPasswordValidated =
      UserService.validatePassword(confirmPassword)
    if (!confirmPasswordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${confirmPassword} is valid`)

    if (oldPassword === newPassword) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_CHANGE,
      })
    }

    const isMatch = UserService.comparePassword(oldPassword, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }

    const updatedUser = await UserService.updatePassword(id, newPassword)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.PASSWORD_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const updatePhone = async (req, res, next) => {
  try {
    const { phone, password } = req.body
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const phoneValidated = UserService.validatePhone(phone)
    if (!phoneValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_NOT_VALID,
      })
    }

    const passwordValidated = UserService.validatePassword(password)
    if (!passwordValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_VALID,
      })
    }
    logger.info(`password ${password} is valid`)

    const isMatch = UserService.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }
    logger.info(`password ${password} is valid`)

    if (user.phone === phone) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_NOT_CHANGE,
      })
    }

    const phoneCheck = await UserService.findByPhone(phone)
    if (phoneCheck) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_EXIST,
      })
    }

    const updatedUser = await UserService.updatePhone(id, phone)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PHONE_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.PHONE_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const updateAddress = async (req, res, next) => {
  try {
    const { address, password } = req.body
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const addressValidated = UserService.validateAddress(address)
    if (!addressValidated) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.ADDRESS_NOT_VALID,
      })
    }

    const isMatch = UserService.comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.PASSWORD_NOT_MATCH,
      })
    }
    logger.info(`password ${password} is valid`)

    if (user.address === address) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.ADDRESS_NOT_CHANGE,
      })
    }

    const updatedUser = await UserService.updateAddress(id, address)
    if (!updatedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.ADDRESS_NOT_CHANGE,
      })
    }
    logger.info(`user ${user.username} updated`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.ADDRESS_CHANGE_SUCCESS,
      data: {
        user: updatedUser,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await UserService.findById(id)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    const deletedUser = await UserService.deleteUser(id)
    if (!deletedUser) {
      return res.status(ConstantHttpCode.BAD_REQUEST).json({
        status: {
          code: ConstantHttpCode.BAD_REQUEST,
          msg: ConstantHttpReason.BAD_REQUEST,
        },
        msg: ConstantMessage.USER_NOT_DELETE,
      })
    }
    logger.info(`user ${user.username} deleted`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.USER_DELETE_SUCCESS,
    })
  } catch (err) {
    return next(err)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    logger.info(`user ${id} found`)

    const user = await UserService.findByIdWithOutPassword(id)
    logger.info(`user ${user} found`)
    if (!user) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`user ${user.username} found`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.USER_FOUND,
      data: {
        user,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const getUsers = async (req, res, next) => {
  try {
    const users = await UserService.findAll()
    if (!users) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`users found`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.USER_FOUND,
      data: {
        users,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export const getUsersStats = async (req, res, next) => {
  try {
    const usersStats = await UserService.getUsersStats()
    if (!usersStats) {
      return res.status(ConstantHttpCode.NOT_FOUND).json({
        status: {
          code: ConstantHttpCode.NOT_FOUND,
          msg: ConstantHttpReason.NOT_FOUND,
        },
        msg: ConstantMessage.USER_NOT_FOUND,
      })
    }
    logger.info(`users stats found`)

    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      msg: ConstantMessage.USER_FOUND,
      data: {
        users: usersStats,
      },
    })
  } catch (err) {
    return next(err)
  }
}

export default {
  updateUsername,
  updateName,
  updateEmail,
  updatePassword,
  updatePhone,
  updateAddress,
  deleteUser,
  getUser,
  getUsers,
  getUsersStats,
}
```

### Authentication Routes

`auth.router.js`

```js
import express from 'express'

import ConstantAPI from '../constants/api.constant'
import AuthController from '../controllers/auth.controller'

const router = express.Router()

router.post(ConstantAPI.AUTH_REGISTER, AuthController.register)
router.post(ConstantAPI.AUTH_LOGIN, AuthController.login)

export default router
```

`user.router.js`

```js
import express from 'express'

import ConstantAPI from '../constants/api.constant'
import UserController from '../controllers/user.controller'
import TokenMiddleware from '../middlewares/token.middleware'

const router = express.Router()

router.post(
  ConstantAPI.USER_UPDATE_USERNAME,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updateUsername,
)
router.post(
  ConstantAPI.USER_UPDATE_NAME,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updateName,
)
router.post(
  ConstantAPI.USER_UPDATE_EMAIL,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updateEmail,
)
router.post(
  ConstantAPI.USER_UPDATE_PASSWORD,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updatePassword,
)
router.post(
  ConstantAPI.USER_UPDATE_PHONE,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updatePhone,
)
router.post(
  ConstantAPI.USER_UPDATE_ADDRESS,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.updateAddress,
)
router.post(
  ConstantAPI.USER_DELETE,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.deleteUser,
)
router.get(
  ConstantAPI.USER_GET,
  TokenMiddleware.verifyTokenAndAuthorization,
  UserController.getUser,
)
router.get(
  ConstantAPI.USER_GET_ALL,
  TokenMiddleware.verifyTokenAndAdmin,
  UserController.getUsers,
)
router.get(
  ConstantAPI.USER_GET_ALL_STATS,
  TokenMiddleware.verifyTokenAndAdmin,
  UserController.getUsersStats,
)

export default router
```

edit `index.js`

```js
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import connectDb from './config/db.config'
import { DATABASE_URL } from './env/variable.env'

// http constant
import ConstantHttpCode from './constants/http.code.constant'
import ConstantHttpReason from './constants/http.reason.constant'

// api constant
import ConstantAPI from './constants/api.constant'

// routers
import AuthRouter from './routers/auth.router'
import UserRouter from './routers/user.router'

connectDb(DATABASE_URL)

const app = express()

// helmet
app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use(cors())
app.use(cookieParser())

app.get('/', (req, res, next) => {
  try {
    return res.status(ConstantHttpCode.OK).json({
      status: {
        code: ConstantHttpCode.OK,
        msg: ConstantHttpReason.OK,
      },
      API: 'Work',
    })
  } catch (err) {
    return next(err)
  }
})

app.use(ConstantAPI.API_AUTH, AuthRouter)
app.use(ConstantAPI.API_USERS, UserRouter)

export default app
```

## Summary

Finally, after compilation, we can now need to deploy the compiled version in the NodeJS production server.

All code from this tutorial as a complete package is available in this [repository](https://github.com/MKAbuMattar/template-express).
