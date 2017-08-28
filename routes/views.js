exports.routes = server => {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: false
    },
    handler: (request, response) => response.file('./static/index.html')
  });

  server.route({
    method: 'GET',
    path: '/{filename}',
    config: {
      auth: false
    },
    handler: (request, response) => response.file(`./static/${request.params.filename}`)
  });
};
