import { Request, Response } from 'express'
import { database } from '../database/connection'
import { convertHours } from '../utils/convert-hours'

interface ScheduleProps{
  week_day:string
  from: string
  to: string
}

export class ClassesController {
  public async index (req:Request, res:Response) {
    const { week_day, subject, time } = req.query
    const fields = [week_day, subject, time]
    for (const query in fields) {
      if (!fields[query]) {
        return res.status(400).json({ Error: 'Missing param' })
      }
    }
    const hours = convertHours(time as string)
    const classes = await database('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [hours])
          .whereRaw('`class_schedule`.`to` > ??', [hours])
      })
      .where('classes.subject', '=', subject as string)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])
    return res.status(200).json(classes)
  }

  public async create (req:Request, res:Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body
    const trx = await database.transaction()
    try {
      const user = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      })
      const classes = await trx('classes').insert({
        subject,
        cost,
        user_id: user[0]
      })
      const classSchedule = schedule.map((item:ScheduleProps) => {
        return {
          class_id: classes[0],
          week_day: item.week_day,
          from: convertHours(item.from),
          to: convertHours(item.to)
        }
      })
      await trx('class_schedule').insert(classSchedule)
      await trx.commit()
      return res.status(201).send()
    } catch (err) {
      await trx.rollback()
      res.json({ Error: 'Unexpcted error while creation new class' })
    }
  }
}
