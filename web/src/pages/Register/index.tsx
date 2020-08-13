import React from  'react';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

function Register(){
    return (
        <div id="page-register">
            <div id="banner">
                <div id="logo-container">
                    <img src={logoImg} alt="Logotipo"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
            </div>
            
            <form>
                <h1>Cadastro</h1>
                <div>
                    <span>Prencha os dados abaixo para começar.</span>

                    <input type="text" placeholder="Nome"/>
                </div>
            </form>
        </div>
    );
}

export default Register;