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
import authRouter from "./auth.router.ts"
import transportRouter from "./transport.router.ts"

/**
 * Se crea un objeto tipo Router
 */
const router: Router = Router()

/**
 * Se usa la dependencia cors
 */
router.use(cors({ origin: "http://localhost:3000" }))

/**
 * Se le dice al router que use las rutas del cityRouter con un prefijo "/city"
 */
router.use("/city", cityRouter)
router.use("/auth", authRouter)
router.use("/transport", transportRouter)

export default router
