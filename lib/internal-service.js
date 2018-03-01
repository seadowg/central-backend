const service = require('express')();

// TODO: overlaps a lot (but frequently not exactly) with service.js.
module.exports = (container) => {

  ////////////////////////////////////////////////////////////////////////////////
  // PRERESOURCE HANDLERS

  // automatically parse JSON if it is marked as such. otherwise, just pull the
  // plain-text body contents.
  const bodyParser = require('body-parser');
  service.use(bodyParser.json({ type: 'application/json' }));
  service.use(bodyParser.text({ type: '*/*' }));

  // apache request commonlog.
  const morgan = require('morgan');
  service.use(morgan('common'));


  ////////////////////////////////////////////////////////////////////////////////
  // RESOURCES

  require('./resources/internal')(service, container);


  ////////////////////////////////////////////////////////////////////////////////
  // POSTRESOURCE HANDLERS

  // apply output error handler to everything.
  const { sendError } = require('./util/http');
  service.use((error, request, response, next) => {
    if (response.headersSent === true) {
      // In this case, we'll just let Express fail the request out.
      return next(error);
    }
    sendError(error, request, response);
  });

  return service;
};

