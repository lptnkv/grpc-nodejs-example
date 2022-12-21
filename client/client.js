const PROTO_PATH = "../protos/shoppingList.proto";

const grpc = require("@grpc/grpc-js")
const protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const ShoppingListService = grpc.loadPackageDefinition(packageDefinition).ShoppingListService;
const client = new ShoppingListService(
    "localhost:50051",
    grpc.credentials.createInsecure()
)

module.exports = client