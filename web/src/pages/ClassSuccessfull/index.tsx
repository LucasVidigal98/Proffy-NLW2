import React, { useState, useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";

import sucessImg from "../../assets/images/icons/success-check-icon.svg";

const ClassSuccessfull: React.FC<RouteComponentProps> = ({ location }) => {
  const [userId, setUserId] = useState(0);

  const history = useHistory();

  function backToHome() {
    history.push({
      pathname: "/landing",
      state: userId,
    });
  }

  useEffect(() => {
    setUserId(location.state as number);
  }, [location.state]);

  return (
    <div id="page-successfull">
      <img src={sucessImg} alt="Sucesso" />
      <h1>Perfil Atualizado e aula cadastrada</h1>
      <button onClick={backToHome}>Voltar para Home</button>
    </div>
  );
};

export default ClassSuccessfull;
