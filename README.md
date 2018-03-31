# React Node Boilerplate `(WIP)`

Opinionated ReactJS + NodeJS full-stack boilerplate application. This boilerplate includes (but is not limited to):

- A fast, scalable web application using [ReactJS](https://reactjs.org/) along with [React Redux](https://github.com/reactjs/react-redux) for the state management
- Server side rendering + HMR (hot module replacement / hot reload), both on the client and server side
- Internationalization (using [PhraseApp](https://phraseapp.com/))
- Fully SEO optimized (locale included in the URL + SSR)
- Uses the latest [Material UI](https://material-ui-next.com/) with CSS-IN-JS

## Getting Started

Clone the repository locally by running:

```git
$ git clone https://github.com/sdec/react-node-fullstack-boilerplate
```

### Prerequisites

You will need the following packages installed:

- Node + npm (8+)
  - https://nodejs.org/en/
  - Alternatively, you can use `nvm` to manage your npm versioning easily: https://github.com/creationix/nvm
- MongoDB (for the datbase)
  - https://www.mongodb.com/

### Installing

1. Install the npm dependencies by running `npm install`
2. Create a free account at [PhraseApp](https://phraseapp.com/) and fill in your personal `accessToken` and `projectId` in `build/env/[ENVIRONMENT].js`
3. Change remaining settings as desired in `build/env/[ENVIRONMENT].js`

## Running

First of all, make sure you have a local mongodb instance running:

```
$ mongod
```

### Scripts

Use the following npm scripts to run the application:

```
npm run client:serve = Runs the client on port 3000
npm run server:serve = Runs the server + client with SSR on port 5000
npm run client:build = Builds the client in production mode
npm run server:build = Builds the server in production mode
npm run build = Builds client and server in production mode
npm run i18n:build = Fetches translations from PhraseApp
npm run deploy = Run the NodeJS server of the production package (Created by 'npm run build')
```

## Deployment

This example provides a `Bitbucket Pipeline` script to push the production package to a remote `Heroku` repository, where it is further deployed.

## Built With

Some of the technologies used:

#### Packaging

* [Gulp](https://gulpjs.com/) - Task automation toolkit
* [Webpack](https://webpack.js.org/) - Static module bundler for modern JavaScript applications
* [Babel](https://babeljs.io/) - ES6 -> ES5 compilation
* [ESLint](https://eslint.org/) - ES6 code linting
* [Prettier](https://github.com/prettier/prettier) - Opinionated code formatter
* [PhraseApp](https://phraseapp.com/) - Translations manager

#### Client

* [React](https://reactjs.org/) - A Javascript library for building user interfaces
* [React Redux](https://github.com/reactjs/react-redux) - A Javascript library for building user interfaces
  * Along with Thunks, Redux Actions (Ducks) and Selectize
* [React Router](https://github.com/ReactTraining/react-router) v4 - Declarative routing for React
* [React Intl](https://github.com/yahoo/react-intl) - Internationalize React apps
* [Material UI](https://material-ui-next.com/) - React components that implement Google's Material Design

#### Server

* [NodeJS](https://nodejs.org/en/) - Javascript runtime
* [Express](https://expressjs.com/) - Javascript web framework
* [Mongoose](http://mongoosejs.com/) - MongoDB object modeling library
* [Passport](http://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js
* And many more... 

## Authors

* **Sander Decoster** - https://github.com/sdec
