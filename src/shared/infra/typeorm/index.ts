import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = process.env.DB_HOST): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "development" ? host : process.env.DB_HOST,
      database: defaultOptions.database,
    })
  );
};
