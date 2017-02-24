'use strict';
const express =  require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const app = express();
const port = 3000;
const devPort = 3001;

// dev-server config
const config = require('./webpack.dev.config.js');
const compiler = webpack(config);
const devServer = new WebpackDevServer(compiler, config.devServer);

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// print the request log on console
app.use(morgan('dev'));

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// print the request log on console
app.use(morgan('dev'));

// dev-server open
devServer.listen(devPort, () => {
  console.log('webpack-dev-server is listening on port', devPort);
});

// server-open
app.use('/', express.static(__dirname + '/app/dist'));
app.listen(port, () => {
  console.log('Express listening on port', port);
});
