const packageAPIEndpoint = zipCode => {
  return process.env.WEATHER_PACKAGE_SERVICE_API_BASE_URL + `${zipCode}?key=${process.env.WEATHER_PACKAGE_SERVICE_API_KEY}`;
}

module.exports = packageAPIEndpoint;
