# Sample NodeJS Gallery with CRUD operations

This project intends to show how to build a simple image uploading server with NodeJS, Express.js and other community supplied modules.

## Installation

To start, please clone this repo.

In the `/public` directory create a folder named `uploads`.

Inside `/config` directory, copy `default.config.js` to  `./config.js` with:

```sh
$ cp default.config.js ./config.js
```

Inside `config.js` change the `database` property  to resource path of your mongoDB database. If you don't have one, you can create one free [here](https://mlab.com/).

Fetch all dependencies in the root folder of your app by running:

```sh
$ npm install
```
Start the server (in the root):
```sh
$ npm start
```
The process will listen at:
```sh
localhost:3000
```