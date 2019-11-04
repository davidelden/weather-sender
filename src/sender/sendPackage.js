const SNS = require('aws-sdk/clients/sns'),
      sns = new SNS(),
      fetchFromAPI = require('../fetch/helpers/fetchFromAPI.js'),
      packageAPIEndpoint = require('../fetch/helpers/packageAPIEndpoint.js'),
      writeStream = require('../streams/actions/writeStream.js'),
      eventMessages = require('../streams/events/eventMessages.js'),
      streamName = 'WeatherSender';

const sendPackage = async msg => {
  if(!Array.isArray(msg) || msg[0] !== 'WeatherPackageAvailable') return;

  const zipCode = msg[1],
        endPoint = packageAPIEndpoint(zipCode),
        weatherPackage = await fetchFromAPI(endPoint);

   writeStream(streamName, eventMessages['start']);

   sns.publish(weatherPackage, (err, data) => {
     if (err) {
       console.log(err, err.stack);
       writeStream(streamName, eventMessages['error'](err));
     } else {
       console.log(`Weather package ${data['MessageId']} for ${zipCode} sent to AWS SNS`);
       writeStream(streamName, eventMessages['published'](zipCode));
     }
   });

   writeStream(streamName, eventMessages['end']);
}

module.exports = sendPackage;
