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
import authRouter from "./auth.router.ts"
import transportRouter from "./transport.router.ts"
import userRouter from "./user.router.ts"
import routeRouter from "./route.router.ts"

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
router.use("/auth", authRouter)
router.use("/transport", transportRouter)
router.use("/user", userRouter)
router.use("/route", routeRouter)

export default router
