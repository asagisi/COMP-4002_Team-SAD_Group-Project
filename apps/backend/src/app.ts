import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { clerkMiddleware } from '@clerk/express';
import { getCorsConfig } from '../config/corsConfig';
import showRoutes from './routes/showRoutes';

dotenv.config();

const app = express();

app.use(cors(getCorsConfig()));
app.use(clerkMiddleware());

// Middleware to parse JSON request bodies
app.use(express.json());

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
