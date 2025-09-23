// Server Configuration
export const SERVER_PORT=5050

// Database
export const DATABASE_CONN="mongodb+srv://admin:admin@cluster0.nx8kf.mongodb.net/eshopping?retryWrites=true&w=majority"

// JWT Authentication
export const JWT_KEY="4vD6~Wd;-MY1zo"
// Expiration in seconds (30 days)
export const JWT_EXPIRE_TIME= 30*60*60*1000

// Email (SMTP)
export const EMAIL_HOST="sandbox.smtp.mailtrap.io"
export const EMAIL_PORT=2525
export const EMAIL_USER="167164c14351da"
export const EMAIL_PASS="a55e77324bea30"
export const EMAIL_AUTHORIZATION=false

// Web Config
export const WEB_CACHE=false
export const MAX_JSON_SIZE="20MB"
export const URL_ENCODE=true

// Request Limiting
export const REQUEST_LIMIT_TIME=20*60000
export const REQUEST_LIMIT_NUMBER=3000
