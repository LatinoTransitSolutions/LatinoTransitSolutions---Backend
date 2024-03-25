import { Router } from "express"
import authMiddleware from "../middleware/auth.ts"
import UserController from "../controllers/UserController"
import MariaDBConnection from "../database/connection/MariaDBConnection"

const router: Router = Router()

const controller = new UserController(MariaDBConnection.getInstance())

router.get("/all", authMiddleware, controller.getAll)
router.get("/get-by-id", authMiddleware, controller.getById)
router.get("/get-one", authMiddleware, controller.getOne)
router.post("/create", authMiddleware, controller.create)
router.put("/update", authMiddleware, controller.update)
router.delete("/delete", authMiddleware, controller.delete)

export default router