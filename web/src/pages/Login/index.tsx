import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import heartImg from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

function Login(){
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    const history = useHistory();

    function handleLogin(e: FormEvent){
        e.preventDefault();

        console.log({email, passwd});

       history.push('/landing');
    }

    return (
        <div id="page-login" className="container">
            <div id="banner">
                <div id="logo-container">
                    <img src={logoImg}/>
                    
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
            </div>

           <div id="login-container">
               <form>
                   <h1>Fazer login</h1>
                   <input id="email-input" type="text" placeholder="E-Mail" onChange={e => {setEmail(e.target.value)}}/>
                   <input id="passwd-input" type="password" placeholder="Senha" onChange={e => {setPasswd(e.target.value)}}/>

                   <div id="login-options">
                      <div id="remember-option">
                            <input type="checkbox" />
                            <span>Lembrar-me</span>
                      </div>

                      <a href="#" target="_blank">Esqueci minha senha</a>
                   </div>

                   <button id="button-login" type="submit" onClick={handleLogin}>Entrar</button>

                   <footer>
                       <div id="account-option">
                            <span>Não tem conta?</span>
                            <a href="#">Cadastra-se</a>
                       </div>

                       <div id="free-like">
                            <span>É de graça</span>
                            <img src={heartImg}/>
                       </div>
                    </footer>
               </form>
           </div>
        </div>
    );
}

export default Login;