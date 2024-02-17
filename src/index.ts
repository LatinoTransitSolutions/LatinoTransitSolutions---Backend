/**
 * dotenv permite cargar las variables de entorno del archivo .env
 */
import dotenv from "dotenv"
dotenv.config()

/**
 * express permite crear un servidor HTTP
 */
import express, { Express } from "express"

/**
 *  Se carga el archivo de rutas donde convergen todas las rutas que se van a crear
 */
import router from "./router/router.ts"

/**
 *  Se carga una constante con el puerto que se define en el .env
 */
const PORT: string | undefined = process.env.API_PORT

/**
 * Se crea el server con express y
 * se le indica que use json para el request
 * y que use el archivo de rutas con el prefijo "/api"
 */
const app: Express = express()
app.use(express.json())
app.use("/api", router)

/**
 * Se inicia el server antes creado
 */
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
