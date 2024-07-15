// Server creation and configuration
const http = require("http");
const app = require("./src/app");
const ChatMsg = require("./src/models/chat_msg.model");

// Config .env
require("dotenv").config();

// Config DB
require("./src/config/db");

// Server creation
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT);

// Listeners
server.on("listening", () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on("error", error => {
    console.log(error);
});

// Config WS Server

// Require socket.io using the http server created
const io = require("socket.io")(server, {
    // Validate the connection to the browser
    cors: { origin: "*" },
});

// Add an event listener "onConnection"
io.on("connection", async socket => {
    // console.log("This function will execute for each connection to the socket");

    //* EMIT will execute directly upon new connections
    //* ON will execute ONLY when the event they are listening for happens

    // EMISSIONS

    // Emits the number of clients online every new connection
    io.emit("clients_online", io.engine.clientsCount);

    // Get 5 last messages from DB (history)
    // sort() method will sort the data by ASC (1) or DESC (-1)
    // limit() method will limit the amount of entries recovered from DB
    const msgHistory = await ChatMsg.find().sort({ createdAt: 1 }).limit(5);

    socket.emit("chat_init", {
        message: "Connection success",
        socketId: socket.id,
        history: msgHistory,
    });

    // Send a message to everyone BUT the socket "owner" to inform "New user connected to the chat"
    socket.broadcast.emit("server_chat_msg", {
        username: "INFO",
        message: "New user connected to the chat",
    });

    // EVENT LISTENERS

    socket.on("client_chat_msg", async data => {
        // console.log(data);

        await ChatMsg.create(data);
        io.emit("server_chat_msg", data);
    });

    socket.on("disconnect", () => {
        io.emit("server_chat_msg", {
            username: "INFO",
            message: "User has disconnected",
        });
        // Emits the number of clients online every disconnection
        io.emit("clients_online", io.engine.clientsCount);
    });
});
