const devConfig = {
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
  },
}

const productionConfig = {
  url: process.env.DATABASE_URL,
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

const config = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...process.env.NODE_ENV === 'production' ? productionConfig : devConfig
}


module.exports = config;
