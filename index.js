const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const port = process.env.PORT || 4000;
app.use(cors());
io.on("connect", (socket) => {
	socket.send("Hello !!");
});
app.get("/", (req, res) => {
	console.log(req.query.hum, req.query.temp);
	const obj = {
		hum: req.query.hum || 0,
		temp: req.query.temp || 0,
	};
	io.emit("data", obj);
	res.send(obj);
});

http.listen(port, () => {
	console.log(`server is up and runing on port : ${port}  ...`);
});
