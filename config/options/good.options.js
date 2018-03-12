import good from 'good';

// Server Logging Options
const goodOptions = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*', error: '*' }]
            },
            {
                module: 'good-console'
            },
            'stdout'
        ]
    }
};

export default {
    plugin: good,
    options: goodOptions
};
