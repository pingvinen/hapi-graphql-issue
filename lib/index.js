const Hapi = require('hapi');
const Good = require('good');
const GraphQL = require('hapi-graphql');

const goodLoggerOptions = {
    includes: {
        request: ['headers', 'payload']
    },
    reporters: {
        myConsoleReporter: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*', error: '*' }]
            },
            {
                module: 'good-squeeze',
                name: 'SafeJson'
            }, 'stdout']
    }
};

const server = new Hapi.Server({});
server.connection({ port: process.env.PORT || 3000 });


server.register({
    register: GraphQL,
    options: {
        query: {
            schema: require('./schema'),
            graphiql: true,
        },
        route: {
            path: '/graphql',
            config: {}
        }
    }
}, () =>
        server.register({
            register: Good,
            options: goodLoggerOptions
        }, (err) => {
            if (err) {
                throw err;
            }

            server.start((error) => {
                if (error) {
                    throw error;
                }
                console.info(`Server running at: ${server.info.uri}`);
            });
        })
);