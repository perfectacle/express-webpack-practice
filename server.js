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
let compiler = webpack(config);
let devServer = new WebpackDevServer(compiler, config.devServer);

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// print the request log on console
app.use(morgan('dev'));

// set the secret key variable for jwt
app.set('jwt-secret', 'SeCrEtKeYfOrHaShInG');

// dev-server open
devServer.listen(devPort, () => {
  console.log('webpack-dev-server is listening on port', devPort);
});

// server open
app.use('/', express.static(__dirname + '/app/dist'));
app.listen(port, () => {
  console.log('Express listening on port', port);
});

app.get('/hello', (req, res) => { // 이렇게 써도 되고
  return res.send('Can you hear me?');
});

const router = require('./routes/posts'); // 요렇게 안에 때려박아도 됨.
app.use('/', router);
app.use('/api', require('./routes/api'));
