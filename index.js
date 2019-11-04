require('dotenv').config();

const readStream = require('./src/streams/actions/readStream.js'),
      msgEmitter = require('./src/emitter/msgEmitter.js'),
      streamName = 'WeatherPackage';

readStream(streamName);
msgEmitter.on('streamMessage', msg => console.log('[Sender]', msg));
// msgEmitter.on('streamMessage', msg => sendPackage(msg));
