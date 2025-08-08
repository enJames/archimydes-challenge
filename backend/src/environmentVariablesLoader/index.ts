import { config } from 'dotenv';
import path from 'path';

export default () => {
  const envFilePath = `../../.env.${process.env.NODE_ENV || 'local'}`;

  config({
    path: path.resolve(__dirname, envFilePath),
    override: true
  });
}