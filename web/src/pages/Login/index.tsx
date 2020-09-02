import React, { FormEvent, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/auth";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";

import logoImg from "../../assets/images/logo.svg";
import heartImg from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [buttonChecked, setButtonChecked] = useState(false);
  const [showPasswd, setShowPasswd] = useState(false);
  const [typeInput, setTypeInput] = useState("password");

  const { LogInAuth, failLogin } = useContext(AuthContext);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (buttonChecked && localStorage.getItem("@proffy/remember") === "false") {
      localStorage.setItem("@proffy/email", email);
      localStorage.setItem("@proffy/passwd", passwd);
      localStorage.setItem("@proffy/remember", "true");
    } else if (!buttonChecked) {
      localStorage.setItem("@proffy/remember", "false");
      localStorage.setItem("@proffy/email", "");
      localStorage.setItem("@proffy/passwd", "");
    }

    await LogInAuth(email, passwd);
  }

  function handleRememberMe() {
    setButtonChecked(!buttonChecked);
  }

  useEffect(() => {
    if (failLogin) {
      alert("Email ou senha incorretos");
    }
  }, [failLogin]);

  useEffect(() => {
    if (localStorage.getItem("@proffy/remember")) {
      if (localStorage.getItem("@proffy/remember") === "true") {
        const emailStorage = localStorage.getItem("@proffy/email");
        const passwdStorage = localStorage.getItem("@proffy/passwd");

        setEmail(emailStorage as string);
        setPasswd(passwdStorage as string);
        setButtonChecked(true);
      }
    } else {
      localStorage.setItem("@proffy/remember", "false");
    }
  }, []);

  useEffect(() => {
    showPasswd ? setTypeInput("text") : setTypeInput("password");
  }, [showPasswd]);

  return (
    <div id="page-login" className="container">
      <div id="banner">
        <div id="logo-container">
          <img src={logoImg} alt="Logotipo" />

          <h2>Sua plataforma de estudos online.</h2>
        </div>
      </div>

      <div id="login-container">
        <form>
          <h1>Fazer login</h1>
          <input
            id="email-input"
            type="text"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div id="passwd-input">
            <input
              id="passwd"
              type={typeInput}
              placeholder="Senha"
              value={passwd}
              onChange={(e) => {
                setPasswd(e.target.value);
              }}
            />
            {showPasswd ? (
              <VisibilityOffOutlinedIcon
                onClick={() => setShowPasswd(!showPasswd)}
                fontSize="large"
                className="visible"
              />
            ) : (
              <VisibilityOutlinedIcon
                onClick={() => setShowPasswd(!showPasswd)}
                fontSize="large"
                className="visible"
              />
            )}
          </div>

          <div id="login-options">
            <div id="remember-option">
              <input
                type="checkbox"
                id="rembember-me"
                checked={buttonChecked}
                onChange={handleRememberMe}
              />
              <span>Lembrar-me</span>
            </div>

            <Link to="reset-password">Esqueci minha senha</Link>
          </div>

          <button id="button-login" type="submit" onClick={handleLogin}>
            Entrar
          </button>

          <footer>
            <div id="account-option">
              <span>Não tem conta?</span>
              <Link to="Register">Cadastra-se</Link>
            </div>

            <div id="free-like">
              <span>É de graça</span>
              <img src={heartImg} alt="Coração roxo" />
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default Login;
