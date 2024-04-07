import { Router } from "express"
import MariaDBConnection from "../database/connection/MariaDBConnection.ts"
import UserController from "../controllers/UserController.ts"

const router: Router = Router()

const controller = new UserController(MariaDBConnection.getInstance())

router.post("/login", controller.login)
router.post("/signup", controller.create)

export default router
