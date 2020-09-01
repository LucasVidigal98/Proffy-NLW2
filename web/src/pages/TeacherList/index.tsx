import React, { useState, FormEvent, useEffect } from "react";

import api from "../../services/api";

import PageHeader from "../../components/PageHeader";
import TeacherItem, {
  Teacher,
  ScheduleItem,
} from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";

import "./styles.css";

function TeacherForm() {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [existsClasse, setExistsClasse] = useState(true);
  const [initialState, setInitialState] = useState(true);

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
    setInitialState(false);
  }

  useEffect(() => {
    teachers.forEach((teacher: any) => {
      api
        .get("schedules", {
          params: {
            user_id: teacher.id,
            subject,
          },
        })
        .then((response) => {
          setSchedules(response.data);
        });
    });
  }, [teachers, subject]);

  useEffect(() => {
    teachers.length > 0 ? setExistsClasse(true) : setExistsClasse(false);
  }, [teachers.length, existsClasse]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader
        title="Estes são os proffys disponíveis."
        pageHeaderName="Estudar"
      >
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação Física", label: "Educação Física" },
              { value: "Física", label: "Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "História", label: "História" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da Semana"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />

          <button type="submit" onClick={searchTeachers}>
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {existsClasse ? (
          teachers.map((teacher: Teacher) => {
            const scheduleTeacher = schedules.map((schedule: ScheduleItem) => {
              if ((teacher.id as number) == (schedule.user_id as number))
                return schedule;
            });

            return (
              <TeacherItem
                key={teacher.id}
                teacher={teacher}
                schedules={(scheduleTeacher as unknown) as ScheduleItem[]}
              />
            );
          })
        ) : (
          <div className="no-classes">
            <h1>
              {initialState
                ? ""
                : "Nenhuma aula encontrada para a sua pesquisa"}
            </h1>
          </div>
        )}
      </main>
    </div>
  );
}

export default TeacherForm;
