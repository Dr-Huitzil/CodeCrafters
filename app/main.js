const net = require("net");

const fs = require("fs");

// You can use print statements as follows for debugging, they'll be visible when running tests.

console.log("Logs from your program will appear here!");

const flags = process.argv.slice(2);

const directory = flags.find((_, index) => flags[index - 1] == "--directory");

// Uncomment this to pass the first stage

const handleConnection = (socket) => {

    socket.on("data", (data) => {

Expand 9 lines

    }else if (path.startsWith("/user-agent")) {

        const userAgent = agent.replace("User-Agent: ", "");

        socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`);

    } else if (path.startsWith("/files/")) {

        const filePath = path.slice(7);

        if (!fs.existsSync(directory + filePath)) {

            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");

            socket.end();

            return;

        }

        const file = fs.readFileSync(directory + filePath);

        socket.write(`HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${file.length}\r\n\r\n${file}`);

    }

    socket.write("HTTP/1.1 404 NOT FOUND\r\n\r\n");

    socket.end();

}

    });

// Handle closing the connection

socket.on("end", () => {

    console.log("Client disconnected");

});

};

const server = net.createServer((socket) => {

    handleConnection(socket);

});

server.listen(4221, "localhost");

// Handle Ctrl+C to gracefully shutdown the server

process.on("SIGINT", () => {

    console.log("Server shutting down...");

    server.close(() => {

        console.log("Server closed.");

        process.exit(0);

    });

});

\ No newline at end of file