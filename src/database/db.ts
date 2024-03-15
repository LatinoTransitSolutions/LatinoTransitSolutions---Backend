import mariadb, { Pool } from "mariadb"

const PORT: string | undefined = process.env.DB_PORT
const HOST: string | undefined = process.env.DB_HOST
const USER: string | undefined = process.env.DB_USER
const PASSWORD: string | undefined = process.env.DB_PASSWORD
const DATABASE: string | undefined = process.env.DB_DATABASE

const pool: Pool = mariadb.createPool({
  connectionLimit: 10,
  port: PORT,
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE
})

export default pool
