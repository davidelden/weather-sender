const publishedMessage = zipCode => (
  ['message', 'WeatherSenderPublished', 'zipcode', zipCode]
);

const errorMessage = errMsg => (
  ['message', 'WeatherSenderError', 'error', errMsg]
);

const eventMessages = {
  start: ['message', 'WeatherSenderStart'],
  end: ['message', 'WeatherSenderEnd'],
  published: publishedMessage,
  error: errorMessage
}

module.exports = eventMessages;
