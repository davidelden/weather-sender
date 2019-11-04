const http = require('http'),
      streamName = 'WeatherSender';

const fetchFromAPI = endPoint => {
  return new Promise((resolve, reject) => {
    http.get(endPoint, res => {
      const { statusCode } = res,
            contentType = res.headers['content-type'];

      let error,
          rawData = '';

      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                          `Expected application/json but received ${contentType}`);
      }

      if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      res.on('data', chunk => rawData += chunk);
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData);
                weatherPackage = { ...parsedData[0]['message'] };

          resolve(weatherPackage);
        } catch (err) {
          console.error(err.message);
          reject(err);
        }
      });
    })
    .on('error', err => {
      console.error(`http.get received an error: ${err.message}`);
    });
  })
  .catch(err => {
    console.error('error:', err);
    reject(err);
  });
}

module.exports = fetchFromAPI;
