const { endpoint, getOrNotFound, success } = require('../util/http');

module.exports = (service, { Config }) => {
  service.get('/config/:key', endpoint(({ params }) =>
    Config.get(params.key).then(getOrNotFound)));

  service.post('/config/:key', endpoint(({ params, body }) =>
    Config.set(params.key, body).then(success)));
};

