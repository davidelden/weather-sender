const fetchFromAPI = require('../fetch/helpers/fetchFromAPI.js'),
      packageAPIEndpoint = require('../fetch/helpers/packageAPIEndpoint.js'),
      writeStream = require('../streams/actions/writeStream.js'),
      eventMessages = require('../streams/events/eventMessages.js'),
      streamName = 'WeatherSender';

const sendPackage = async msg => {
  if(!Array.isArray(msg) || msg[0] !== 'WeatherPackageAvailable') return;

  const zipCode = msg[1],
        endPoint = packageAPIEndpoint(zipCode),
        weatherPackage = await fetchFromAPI(endPoint);

  console.log('[sendPackage]', weatherPackage);
   writeStream(streamName, eventMessages['start']);

   // Send weatherPackage to AWS SNS

   // On success callback write weather published message to stream
   // writeStream(streamName, eventMessages['published']);

   // On error callback write error message to stream
   // writeStream(streamName, eventMessages['error']);

   writeStream(streamName, eventMessages['end']);
}

module.exports = sendPackage;
