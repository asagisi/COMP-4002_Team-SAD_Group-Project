import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { getCorsConfig } from '../config/corsConfig';
import showRoutes from './routes/showRoutes';

const app = express();

// Apply CORS using dynamic config
app.use(cors(getCorsConfig()));

// Middleware to parse JSON request bodies
app.use(express.json());

// Clerk auth
app.use(clerkMiddleware());

// Interface for health check response
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// respond to GET request at endpoint "/" with message
app.get("/", (req, res) => {
    res.send("Hello World");
});

/**
 * Health check endpoint that returns server status information
 * @returns JSON response with server health metrics
 */
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

app.use("/api/v1/shows", showRoutes);

export default app;
