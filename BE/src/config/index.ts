import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({ path: path.join(__dirname, '../../.env') });
if (envFound.error) {
  throw new Error("Couldn't Find .env file");
}

export default {
  port: process.env.PORT || 3000,
  databaseURL:
    process.env.DATABASE_URL || 'mongodb://localhost:27017/account-C',
  githubCLIENT: process.env.GITHUB_CLIENT_ID,
  githubSECRET: process.env.GITHUB_CLIENT_SECRET,
  naverCLIENT: process.env.NAVER_CLIENT_ID,
  naverSECRET: process.env.NAVER_CLIENT_SECRET,
  jwtKEY: process.env.JWT_KEY,
};
