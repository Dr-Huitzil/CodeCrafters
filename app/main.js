const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.

console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {

    socket.on("data", (data) => {

        const requestData = data.toString();

        const requestLines = requestData.split("\r\n");

        const [method, path, protocol] = requestLines[0].split(" ");

        let response;

        if (path === "/") {

            response = "HTTP/1.1 200 OK\r\nContent-Length: 0\r\n\r\n";

        } else if (path === "/user-agent") {

            const userAgent = requestLines[2].split(" ")[1];

            response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`;

        } else if (path.startsWith("/echo/")) {

            const randomString = path.split("/echo/")[1];

            response = `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${randomString.length}\r\n\r\n${randomString}`;

        } else {

            response = "HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\n\r\n";

        }

        socket.write(response);

    });

    socket.on("close", () => {

        socket.end();

        server.close();

    });

});

server.listen(4221, "localhost");