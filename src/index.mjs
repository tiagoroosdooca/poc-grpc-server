import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

import { getPeopleRoute } from './person/grpc/get-people-route.mjs';
import { getPersonRoute } from './person/grpc/get-person-route.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH =  path.join(__dirname, './proto/routes-guide.proto')
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
)


const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const routesGuide = protoDescriptor.RoutesGuide

const server = new grpc.Server()
server.addService(routesGuide.service, {
    GetPerson: getPersonRoute,
    GetPeople: getPeopleRoute
})

const SERVER_ADDRESS = 'localhost:50051'

server.bindAsync(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server running at ${SERVER_ADDRESS}`)
});