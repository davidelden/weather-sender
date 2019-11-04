const fetchFromAPI = require('../fetch/helpers/fetchFromAPI.js'),
      packageAPIEndpoint = require('../fetch/helpers/packageAPIEndpoint.js');

const sendPackage = async msg => {
  if(!Array.isArray(msg) || msg[0] !== 'WeatherPackageAvailable') return;

  const zipCode = msg[1],
        endPoint = packageAPIEndpoint(zipCode),
        weatherPackage = await fetchFromAPI(endPoint);

  console.log('[sendPackage]', weatherPackage);

   // Write sender start message to stream

   // Send weatherPackage to AWS SNS
   // On success callback write weather published message to stream
   // On error callback write error message to stream

   // Write sender end message to stream
}

module.exports = sendPackage;
