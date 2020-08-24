import { Request, Response } from "express";

import convertHourToMinutes from "../utils/convertHoursToMinutes";
import covertMinutesToHour from "../utils/convertMinutesToHours";
import serializedHour from "../utils/serializedHour";
import db from "../database/connection";
import convertMinutesToHour from "../utils/convertMinutesToHours";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesControler {
  async index(request: Request, response: Response) {
    const filters = request.query;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: "Missing filters to serach classes",
      });
    }

    const timeInminutes = convertHourToMinutes(filters.time as string);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`class_schedule`.`week_day` = ??", [
            Number(filters.week_day),
          ])
          .whereRaw("`class_schedule`.`from` <= ??", [timeInminutes])
          .whereRaw("`class_schedule`.`to` > ??", [timeInminutes]);
      })
      .where("classes.subject", "=", filters.subject as string)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const { id, whatsapp, bio, subject, cost, schedule } = request.body;
    console.log(request.body);
    //transaction
    const trx = await db.transaction();

    try {
      await trx("users")
        .update({
          whatsapp,
          bio,
        })
        .where("id", "=", id as number);

      const user_id = id;

      const insertedClassesIds = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id,
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: "Unexpected error while creating new class",
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id, whatsapp, bio, subject, cost, schedule } = request.body;

    const trx = await db.transaction();

    try {
      const classId = await trx("classes")
        .select("id")
        .where("user_id", "=", id)
        .where("subject", subject);

      await trx("users")
        .update({
          whatsapp,
          bio,
        })
        .where("id", "=", id);

      await trx("classes")
        .update({
          subject,
          cost,
        })
        .where("id", "=", classId[0].id);

      const schedulesArray = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id: classId[0].id,
        };
      });

      await trx("class_schedule")
        .delete()
        .where("class_id", "=", classId[0].id);

      await trx("class_schedule").insert(schedulesArray);

      trx.commit();

      return response.status(200).send();
    } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: "Unexpected error while updating new class",
      });
    }
  }

  async checkIfClassesExists(request: Request, response: Response) {
    const { user_id, subject } = request.query;

    const classId = await db("classes")
      .select("cost")
      .where("user_id", "=", user_id as string)
      .where("subject", "=", subject as string);

    if (classId.length === 0) {
      response.json([]);
    } else {
      response.json(classId[0].cost);
    }
  }

  async getSchedules(request: Request, response: Response) {
    const { user_id, subject } = request.query;

    try {
      const classId = await db("classes")
        .select("id")
        .where("subject", "=", subject as string)
        .where("user_id", "=", user_id as string);

      const schedules = await db("class_schedule")
        .select("*")
        .where("class_schedule.class_id", "=", classId[0].id);

      const schedulesArray = schedules.map((schedule) => {
        return {
          week_day: schedule.week_day,
          from: serializedHour(convertMinutesToHour(schedule.from)),
          to: serializedHour(convertMinutesToHour(schedule.to)),
        };
      });

      response.status(200).json(schedulesArray);
    } catch (err) {
      console.log(err);

      return response.status(400).json({
        error: "Unexpected error while get schedules",
      });
    }
  }
}
