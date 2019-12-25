const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));

var arrUsers = [];
// var arrImgs = [];
io.on("connection", socket => {
    const { id } = socket.client;
    // console.log(`User connected: ${id}`);
    socket.on("client-send-Username", function(data){
        // bat truong hop bi trung USername
        if(arrUsers.indexOf(data) >= 0){
            socket.emit("server-send-dki-thatbai");
        }else{
            arrUsers.push(data);
            socket.Username = data;
            socket.emit("server-send-dki-thanhcong", data);
            // emit tat ca user connect vs server
            io.sockets.emit("server-send-danhsach-Users", arrUsers);
        }
    });
    socket.on("user-send-img", function (data) {
        // console.log(data)
        // arrImgs.push(data);
        io.sockets.emit("server-send-danhsach-img", data);
    });
})