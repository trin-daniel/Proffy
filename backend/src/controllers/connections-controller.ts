import { Request, Response } from 'express'
import { database } from '../database/connection'

export class ConnectionController {
  public async create (req: Request, res:Response) {
    const { user_id } = req.body
    if (!user_id) {
      return res.status(400).json({ Error: 'bad request' })
    } else {
      await database('connections').insert({ user_id })
      return res.status(200).send()
    }
  }

  public async index (req:Request, res:Response) {
    const connections = await database('connections')
      .count('* as total')
    const { total } = connections[0]
    if (!total) {
      return res.status(404).json({ Error: 'connections is not exist' })
    }
    return res.status(200).json({ total })
  }
}
