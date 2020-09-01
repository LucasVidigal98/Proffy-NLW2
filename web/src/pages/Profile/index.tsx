import React, { useEffect, useState, FormEvent } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";

import camIcon from "../../assets/images/icons/camera.svg";
import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

const Profile: React.FC<RouteComponentProps> = ({ location }) => {
  const [name, setName] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [classesExists, setClassesExists] = useState(false);
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);
  const [userInfo, setUserInfo] = useState({
    state: {
      id: 0,
      name: "",
      middlename: "",
      email: "",
      avatar: "",
      whatsapp: "",
      bio: "",
    },
  });

  const history = useHistory();

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
    console.log("add");
  }

  function deleteScheduleItem(e: FormEvent, index: number) {
    e.preventDefault();
    setScheduleItems(scheduleItems.slice(index, index + 1));
  }

  function setScheduleItemValue(postion: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === postion) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  async function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    if (!classesExists) {
      await api
        .post("classes", {
          user_id: userInfo.state.id,
          name,
          middlename,
          email,
          whatsapp,
          bio,
          subject,
          cost: Number(cost),
          schedule: scheduleItems,
        })
        .then(() => {
          const user_id = userInfo.state.id;
          history.push({
            pathname: "/class-successfull",
            state: user_id,
          });
        })
        .catch(() => {
          alert("Erro no cadastro!");
        });
    } else {
      await api
        .put("classes-update", {
          user_id: userInfo.state.id,
          name,
          middlename,
          email,
          whatsapp,
          bio,
          subject,
          cost: Number(cost),
          schedule: scheduleItems,
        })
        .then(() => {
          const user_id = userInfo.state.id;
          history.push({
            pathname: "/class-successfull",
            state: user_id,
          });
        })
        .catch(() => {
          alert("Erro ao atualizar cadastro !");
        });
    }
  }

  useEffect(() => {
    setUserInfo(location.state as any);
  }, [location.state, userInfo]);

  useEffect(() => {
    setName(userInfo.state.name);
    setMiddlename(userInfo.state.middlename);
    setEmail(userInfo.state.email);
    setWhatsapp(userInfo.state.whatsapp);
    setBio(userInfo.state.bio);
  }, [userInfo]);

  useEffect(() => {
    api
      .get("classes-exists", {
        params: {
          user_id: userInfo.state.id,
          subject,
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          setClassesExists(false);
        } else {
          setCost(response.data);
          setClassesExists(true);
        }
      });
  }, [subject, userInfo]);

  useEffect(() => {
    if (classesExists) {
      api
        .get("schedules", {
          params: {
            user_id: userInfo.state.id,
            subject,
          },
        })
        .then((response) => {
          setScheduleItems(response.data);
        });
    } else {
      setScheduleItems([{ week_day: 0, from: "", to: "" }]);
      setCost("");
    }
  }, [classesExists, userInfo, subject]);

  return (
    <div id="page-profile">
      <PageHeader pageHeaderName="Meu Perfil" profileHeader>
        <div id="image-profile">
          <div id="image-container">
            <img id="avatar" src={userInfo.state.avatar} alt="Usuário" />

            <img id="change-avatar" src={camIcon} alt="Alterar foto" />
          </div>

          <span>{userInfo.state.name + " " + userInfo.state.middlename}</span>
          <span>{subject}</span>
        </div>
      </PageHeader>

      <main>
        <form>
          <fieldset id="user-data">
            <legend>Seus Dados</legend>
            <div id="names">
              <Input
                name="name"
                label="Nome"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                name="middle-name"
                label="Sobrenome"
                id="middle-name"
                value={middlename}
                onChange={(e) => setMiddlename(e.target.value)}
              />
            </div>

            <div id="contact">
              <Input
                name="email"
                label="E-mail"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                name="whatsapp"
                label="Whatsapp"
                id="wpp"
                wthatsapp
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>

            <Textarea
              name="bio"
              label="Biografia"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset id="about">
            <legend>Sobre a aula</legend>

            <div id="subject-info">
              <Select
                name="subject"
                label="Matéria"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
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

              <Input
                name="cost"
                label="Custo da sua hora por aula R$"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da Semana"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
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
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  />
                  {classesExists && (
                    <button
                      className="delete-schedule"
                      onClick={(e) => deleteScheduleItem(e, index - 1)}
                    >
                      x Excluir horário
                    </button>
                  )}
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br />
              Preencha todos os Dados
            </p>

            <button type="submit" onClick={handleCreateClass}>
              Salvar perfil
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default Profile;
