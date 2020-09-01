import React from "react";

import api from "../../services/api";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

export interface ScheduleItem {
  user_id: number;
  week_day: number;
  from: string;
  to: string;
  day: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  schedules: ScheduleItem[];
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, schedules }) => {
  function createNewConnection() {
    api.post("connections", {
      user_id: teacher.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />

        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <div id="schedules">
        {schedules.map((schedule: ScheduleItem) => (
          <div key={schedule.week_day} className="day">
            <span>Dia</span>
            <strong>{schedule.day}</strong>
            <span>Horário</span>
            <strong>
              {schedule.from} - {schedule.to}
            </strong>
          </div>
        ))}
      </div>

      <footer>
        <p>
          Preço/hora
          <strong>{teacher.cost}</strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={whatsappIcon} alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
