exports.routes = server => {

  // Get index.html
  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: false
    },
    handler: (request, response) => response.file(`./static/html/index.html`)
  });

  // Get favicon.ico
  server.route({
    method: 'GET',
    path: '/favicon.ico',
    config: {
      auth: false
    },
    handler: (request, response) => response.file(`./static/images/favicon.ico`)
  });

  // Get css
  server.route({
    method: 'GET',
    path: '/css/{filename}',
    config: {
      auth: false
    },
    handler: (request, response) => response.file(`./static/css/${request.params.filename}`)
  });

  // Get html
  server.route({
    method: 'GET',
    path: '/html/{filename}',
    config: {
      auth: false
    },
    handler: (request, response) => response.file(`./static/html/${request.params.filename}`)
  });

  // Get images
  server.route({
    method: 'GET',
    path: '/images/{filename}',
    config: {
      auth: false
    },
    handler: (request, response) => response.file(`./static/images/${request.params.filename}`)
  });

  // Get js
  server.route({
    method: 'GET',
    path: '/js/{filename}',
    config: {
      auth: false
    },
    handler: (request, response) => response.file(`./static/js/${request.params.filename}`)
  });
};
