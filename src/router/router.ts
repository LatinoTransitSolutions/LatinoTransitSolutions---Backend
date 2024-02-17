/**
 * cors permite manejar las politicas CORS de los navegadores
 */
import cors from "cors"

/**
 * Se obtiene solo la función Router de express para crear las rutas
 */
import { Router } from "express"

/**
 * archivo de rutas para las ciudades
 */
import cityRouter from "./city.router.ts"

/**
 * Se crea un objeto tipo Router
 */
const router: Router = Router()

/**
 * Se usa la dependencia cors
 */
router.use(cors({ origin: "*" }))

/**
 * Se le dice al router que use las rutas del cityRouter con un prefijo "/city"
 */
router.use("/city", cityRouter)

export default router
