require('dotenv').config();

const readStream = require('./src/streams/actions/readStream.js'),
      msgEmitter = require('./src/emitter/msgEmitter.js'),
      sendPackage = require('./src/sender/sendPackage.js'),
      streamName = 'WeatherPackage';

readStream(streamName);
msgEmitter.on('streamMessage', msg => sendPackage(msg));
