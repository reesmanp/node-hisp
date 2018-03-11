import hapiRoutes from 'hapi-routes';

// Server Routes Options
export default dirname => ({
    plugin: hapiRoutes,
    options: {
        dir: `${dirname}/routes/**/*.js`
    }
});
