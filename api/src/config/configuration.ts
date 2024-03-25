import { ConfigModule } from "@nestjs/config";

export type ConfigurationOptions = {
  port: string;
  wikipedia: { url: string };
  libreTranslate: { url: string; key: string }
  database: {
    type: string;
    host: string;
    port: string;
    user: string;
    password: string;
    name: string;
  }
}

export const configurationOptions = () => ({
  port: process.env.PORT,
  wikipedia: {
    url: process.env.WIKIPEDIA_API_URL,
  },
  libreTranslate: {
    url: process.env.LIBRE_TRANSLATE_API_URL,
    key: process.env.LIBRE_TRANSLATE_API_KEY,
  },
  database: {
    type: process.env.DATABASE_CONNECTION,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
} as ConfigurationOptions);

export default ConfigModule.forRoot({ isGlobal: true, load: [configurationOptions]});
