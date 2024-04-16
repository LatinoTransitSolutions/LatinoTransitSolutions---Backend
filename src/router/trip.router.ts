import { Router } from "express"
import authMiddleware from "../middleware/auth.ts"
import MariaDBConnection from "../database/connection/MariaDBConnection.ts"
import TripController from "../controllers/TripController.ts"

const router: Router = Router()

const controller = new TripController(MariaDBConnection.getInstance())

router.get("/all", authMiddleware, controller.getAll)
router.get("/get-my-trips/:idUser", authMiddleware, controller.getMyPackages)
router.get("/get-by-id/:id", authMiddleware, controller.getById)
router.get("/get-by-column/:column/:value", authMiddleware, controller.getByColumn)
router.get("/available-transports", authMiddleware, controller.getAvailableTransports)
router.post("/create", authMiddleware, controller.create)
router.put("/update", authMiddleware, controller.update)
router.delete("/delete", authMiddleware, controller.delete)

export default router