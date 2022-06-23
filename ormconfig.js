const devConfig = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  extra: {
    ssl: {
      rejectUnauthorized: false
    },
  },
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
  },
}

const productionConfig = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  extra: {
    ssl: {
      rejectUnauthorized: false
    },
  },
  migrations: ["./dist/shared/infra/typeorm/migrations/*.js"],
  entities: ["./dist/modules/**/entities/*.js"],
  cli: {
    migrationsDir: "./dist/shared/infra/typeorm/migrations",
  },
}

module.exports = process.env.NODE_ENV = 'production' ? productionConfig : devConfig;
