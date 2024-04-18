import { Router } from "express"
import authMiddleware from "../middleware/auth.ts"
import MariaDBConnection from "../database/connection/MariaDBConnection.ts"
import RouteController from "../controllers/RouteController.ts"

const router: Router = Router()

const controller = new RouteController(MariaDBConnection.getInstance())

router.get("/all", authMiddleware, controller.getAll)
router.get("/get-my-routes/:idCarrier", authMiddleware, controller.getMyRoutes)
router.get("/get-by-id/:id", authMiddleware, controller.getById)
router.get("/get-by-column/:column/:value", authMiddleware, controller.getByColumn)
router.get("/pending-routes", authMiddleware, controller.getPendingRoutes)
router.get("/available-routes", authMiddleware, controller.getAvailableRoutes)
router.get("/get-transports-route/:idRoute", authMiddleware, controller.getTransportsRoute)
router.post("/create", authMiddleware, controller.create)
router.post("/assign-transport", authMiddleware, controller.assignTransport)
router.put("/update", authMiddleware, controller.update)
router.put("/approve-route", authMiddleware, controller.approveRoute)
router.delete("/delete", authMiddleware, controller.delete)

export default router
