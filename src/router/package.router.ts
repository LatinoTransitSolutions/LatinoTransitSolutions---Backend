import { Router } from "express"
import authMiddleware from "../middleware/auth.ts"
import MariaDBConnection from "../database/connection/MariaDBConnection.ts"
import PackageController from "../controllers/PackageController.ts"

const router: Router = Router()

const controller = new PackageController(MariaDBConnection.getInstance())

router.get("/all", authMiddleware, controller.getAll)
router.get("/get-my-packages/:idUser", authMiddleware, controller.getMyPackages)
router.get("/get-by-id/:id", authMiddleware, controller.getById)
router.get("/get-by-column/:column/:value", authMiddleware, controller.getByColumn)
router.post("/create", authMiddleware, controller.create)
router.put("/update", authMiddleware, controller.update)
router.delete("/delete", authMiddleware, controller.delete)

export default router