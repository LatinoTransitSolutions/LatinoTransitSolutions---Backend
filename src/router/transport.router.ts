import { Router } from "express"
import authMiddleware from "../middleware/auth.ts"
import MariaDBConnection from "../database/connection/MariaDBConnection.ts"
import TransportController from "../controllers/TransportController.ts"

const router: Router = Router()

const controller = new TransportController(MariaDBConnection.getInstance())

router.get("/all", authMiddleware, controller.getAll)
router.get("/get-my-transports/:idCarrier", authMiddleware, controller.getMyTransports)
router.get("/get-by-id/:id", authMiddleware, controller.getById)
router.get("/get-by-column/:column/:value", authMiddleware, controller.getByColumn)
router.post("/create", authMiddleware, controller.create)
router.put("/update", authMiddleware, controller.update)
router.delete("/delete", authMiddleware, controller.delete)

export default router
