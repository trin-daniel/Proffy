import { Router } from 'express'
import { ClassesController } from './controllers/classes-controller'
import { ConnectionController } from './controllers/connections-controller'

export const routes = Router()
routes.post('/classes', new ClassesController().create)
routes.get('/classes', new ClassesController().index)
routes.post('/connections', new ConnectionController().create)
routes.get('/connections', new ConnectionController().index)
