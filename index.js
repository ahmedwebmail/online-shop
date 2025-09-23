import express from 'express';
import cors from 'cors';
import rateLimit from "express-rate-limit";
import helmet from 'helmet';
import mongoose from 'mongoose';
import router from './routes/api.js';
import {
    DATABASE_CONN,
    MAX_JSON_SIZE,
    REQUEST_LIMIT_NUMBER,
    REQUEST_LIMIT_TIME, SERVER_PORT,
    URL_ENCODE,
    WEB_CACHE
} from './app/settings/config.js';

const app = express();
app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(rateLimit())

app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODE}))

const limiter = rateLimit({windowMs: REQUEST_LIMIT_TIME, max: REQUEST_LIMIT_NUMBER})
app.use(limiter)

app.set('etag', WEB_CACHE)
/**
 * Establish a connection to the MongoDB database using Mongoose.
 *
 * - `process.env.DATABASE_CONN`: The connection string is securely loaded from settings variables.
 * - `autoIndex: true`: Ensures that indexes are automatically created (useful in development,
 *   but consider disabling in production for performance reasons).
 * - `.then(...)`: Logs a success message once the connection is established.
 * - `.catch(...)`: Handles and logs any connection errors.
 *
 * This setup ensures that the application has a reliable connection
 * to MongoDB before performing any database operations.
 */

mongoose.connect(DATABASE_CONN, {autoIndex: true})
    .then(()=>{
        console.log('MongoDB Connected');
    })
.catch(()=>{
        console.log('MongoDB Connection Error');
    })

/**
 * Mounts the main application router under the "/api" path.
 *
 * All API endpoints defined within the router will be prefixed with "/api".
 * For example:
 *   - router.get("/users") becomes "/api/users"
 *   - router.post("/login") becomes "/api/login"
 *
 * This approach keeps the API routes organized and provides
 * a clear namespace for all backend endpoints.
 */
app.use("/api", router);

/**
 * Starts the Express server and listens on the specified port.
 *
 * The port number is retrieved from the settings file `SERVER_PORT`.
 * This approach makes the application flexible and deployable in various settings,
 * as the hosting service (e.g., Heroku, AWS, or Docker) can dynamically assign the port.
 *
 * Once the server is running, a confirmation message is logged to the console.
 */
app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
})