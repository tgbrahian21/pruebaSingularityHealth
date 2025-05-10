const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const cors = require('cors');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { sequelize } = require('./models');

async function startServer() {
    const app = express();

    // 1. Middleware para parsear JSON (reemplaza body-parser)
    app.use(express.json());

    // 2. Configuración de CORS global (mejor práctica)
    app.use(cors({
        origin: process.env.FRONTEND_URL || '*',
        credentials: true,
        methods: ['POST', 'GET', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // 3. Configuración de Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: process.env.NODE_ENV !== 'production',
        // Mejora: Habilitar caché en producción
        cache: process.env.NODE_ENV === 'production' ? 'bounded' : undefined
    });

    await server.start();

    // 4. Middleware de Apollo (más simple sin body-parser)
    app.use(
        '/graphql',
        expressMiddleware(server, {
            context: async ({ req }) => ({
                req,
                db: sequelize.models
            }),
        })
    );

    // 5. Iniciar servidor con mejor manejo de errores
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        console.log('✅ Database connected successfully');

        const port = process.env.PORT || 4000;
        const serverInstance = app.listen(port, () => {
            console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
            console.log(`⚡ GraphQL playground available at http://localhost:${port}/graphql`);
        });

        // Manejo de cierre elegante
        process.on('SIGTERM', () => {
            serverInstance.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();