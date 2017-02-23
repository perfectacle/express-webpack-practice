import express from 'express';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const app = express();
const port = 3000;
const devPort = 3001;

if(process.env.NODE_ENV === 'development') {
  console.log('Server is running on development mode');
  const config = require('../../webpack.dev.config.js');
  let compiler = webpack(config);
  let devServer = new WebpackDevServer(compiler, config.devServer);
  devServer.listen(devPort, () => {
    console.log('webpack-dev-server is listening on port', devPort);
  });
}

app.use('/', express.static(__dirname + '/../../app/dist'));
app.listen(port, () => {
  console.log('Express listening on port', port);
});

app.get('/hello', (req, res) => { // 이렇게 써도 되고
  return res.send('Can you hear me?');
});

import router from './routes/posts'; // 요렇게 안에 때려박아도 됨.
app.use('/', router);
