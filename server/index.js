const PROTO_PATH = "../protos/shoppingList.proto";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
    defaults: true,
    oneofs: true,
});
var shoppingListProto = grpc.loadPackageDefinition(packageDefinition);
const { v4: uuidv4 } = require("uuid");
const server = new grpc.Server();
var shoppingList = [
    {
        id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
        name: "Молоко",
        isDone: false,
        quantity: 2
    },
    {
        id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
        name: "Мясо",
        isDone: false,
        quantity: 1
    },
    {
        id: "3ee8be6d-758b-4106-af09-0f8542dab82e",
        name: "Хлеб",
        isDone: false,
        quantity: 3
    },
];
server.addService(shoppingListProto.ShoppingListService.service, {
    getAll: (_, callback) => {
        callback(null, { items: shoppingList });
    },
    get: (call, callback) => {
        let item = shoppingList.find((item) => item.id == call.request.id);
        if (item) {
            callback(null, item);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Не найдено",
            });
        }
    },
    insert: (call, callback) => {
        let item = call.request;
        item.id = uuidv4();
        shoppingList.push(item);
        callback(null, item);
    },
    update: (call, callback) => {
        let existingItem = shoppingList.find(
            (item) => item.id == call.request.id
        );
        if (existingItem) {
            existingItem.name = call.request.name;
            existingItem.isDone = call.request.isDone;
            existingItem.quantity = call.request.quantity;
            callback(null, existingItem);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Не найдено",
            });
        }
    },
    remove: (call, callback) => {
        console.log(call.request)
        let existingItemIndex = shoppingList.findIndex(
            (item) => item.id == call.request.id
        );
        if (existingItemIndex != -1) {
            shoppingList.splice(existingItemIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Не найдено",
            });
        }
    },
});
server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
        server.start();
        console.log("Сервер запущен по адресу http://127.0.0.1:50051");
    }
);
