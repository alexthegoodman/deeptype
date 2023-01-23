"use strict";
exports.__esModule = true;
exports.server = void 0;
var server_1 = require("@apollo/server");
var schema_1 = require("./schema");
// const prisma = new PrismaClient();
exports.server = new server_1.ApolloServer({
    schema: schema_1.protectedSchema
});
// use ./index.ts to start server instead
// const { url } = await startStandaloneServer(server);
//# sourceMappingURL=server.js.map