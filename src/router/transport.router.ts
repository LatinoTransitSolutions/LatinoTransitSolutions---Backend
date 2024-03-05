import { Request, Response, Router } from "express"
import authMiddleware from "../middleware/auth.ts"
import MariaDBConnection from "../database/connection/MariaDBConnection.ts"

import TransportController from "../controllers/TransportController.ts"
import TransportFactory from "../patterns/transport/factory/TransportFactory.ts"
import Transport from "../patterns/transport/product/TransportInterface.ts"
import WalkingFactory from "../patterns/transport/factory/WalkingFactory.ts"
import MotorcycleFactory from "../patterns/transport/factory/MotorcycleFactory.ts"
import PickupFactory from "../patterns/transport/factory/PickupFactory.ts"
import TruckFactory from "../patterns/transport/factory/TruckFactory.ts"
import TransportPlateFactory from "../patterns/transport/factory/TransportPlateFactory.ts"
import TransportPlate from "../patterns/transport/product/TransportPlateInterface.ts"

const router: Router = Router()

const controller = new TransportController(new MariaDBConnection())

router.get("/all", authMiddleware, controller.getAll)
router.get("/get-by-id", authMiddleware, controller.getById)
router.get("/get-one", authMiddleware, controller.getOne)
router.post("/create", authMiddleware, controller.create)
router.put("/update", authMiddleware, controller.update)
router.delete("/delete", authMiddleware, controller.delete)

router.post("/factory", authMiddleware, (req: Request, res: Response) => {
  let factory: TransportFactory | TransportPlateFactory = null
  let transport: Transport | TransportPlate = null

  switch (req.body.type) {
    case "walking":
      factory = new WalkingFactory()
      transport = factory.setData(undefined, "Harold", 1, 1, 1, 8000)
      break
    case "motorcycle":
      factory = new MotorcycleFactory()
      transport = factory.setData(undefined, "Bajaj", 0.5, 1, 1, 15000, "ABC123")
      break
    case "pickup":
      factory = new PickupFactory()
      transport = factory.setData(undefined, "Toyota", 1.5, 2, 2.2, 80000, "ABC123")
      break
    case "truck":
      factory = new TruckFactory()
      transport = factory.setData(undefined, "Hyundai", 2, 2.5, 4, 190000, "ABC123")
      break
  }
  res.send({ ...transport, type: transport.constructor.name.toLowerCase() })
})

export default router
