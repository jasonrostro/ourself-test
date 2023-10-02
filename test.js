const request = require('supertest');
const { startApolloServer } = require('./server');

let serverInstance;

describe('GraphQL API', () => {

    beforeAll(async () => {
        const { server } = await startApolloServer();
        serverInstance = server;
    });

    afterAll((done) => {
        serverInstance.close(done); // Close the server after testing
    });

    it('should return appetizers', async () => {
        const response = await request(serverInstance)
            .post('/graphql')
            .send({ query: '{ getAppetizers { name } }' })
            .expect(200);

        expect(response.body.data.getAppetizers).toHaveLength(1);
    });

    it('should return entrees', async () => {
        const response = await request(serverInstance)
            .post('/graphql')
            .send({ query: '{ getEntrees { name } }' })
            .expect(200);

        expect(response.body.data.getEntrees).toHaveLength(1);
    });

    it('should return sandwiches', async () => {
        const response = await request(serverInstance)
            .post('/graphql')
            .send({ query: '{ getSandwiches { name } }' })
            .expect(200);

        expect(response.body.data.getSandwiches).toHaveLength(1);
    });

    it('should return fajitas', async () => {
        const response = await request(serverInstance)
            .post('/graphql')
            .send({ query: '{ getFajitas { name } }' })
            .expect(200);

        expect(response.body.data.getFajitas).toHaveLength(1);
    });

    // Add more test cases for other queries
});
