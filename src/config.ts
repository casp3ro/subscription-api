import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

const config = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  autoLoadEntities: true,
};

export default registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
