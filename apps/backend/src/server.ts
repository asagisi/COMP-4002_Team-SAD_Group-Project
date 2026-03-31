import app from "./app";

// import server type definition
import { Server } from "http";

// initialize a port as either a string or 3000 by default
const PORT: string | 3000 = process.env.PORT || 3000;

// initialize server for the application to listen for requests on the specified ports
const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on("error", async (error: NodeJS.ErrnoException) => {
    if (error.code !== "EADDRINUSE") {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }

    try {
        const response = await fetch(`http://localhost:${PORT}/api/v1/health`);
        if (response.ok) {
            console.log(`Server is already running on port ${PORT}.`);
            process.exit(0);
        }

        console.error(`Port ${PORT} is in use by another process.`);
        process.exit(1);
    } catch {
        console.error(`Port ${PORT} is in use by another process.`);
        process.exit(1);
    }
});

// if I intend to test the server in integration or end-to-end testing export it
export default server;