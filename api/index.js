// include .env variables
import dotenv from 'dotenv';
dotenv.config();

// export express api so vercel can access it
export { api as default } from '../utils'
