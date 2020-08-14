import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backImg from '../../assets/images/icons/back.svg';

import './styles.css';

function ResetPassword(){
    const [resetEmail, setResetEmail] = useState('');

    const history = useHistory();

    function handleResetPasswd(e: FormEvent){
        e.preventDefault();

        console.log(resetEmail);

        history.push('/reset-successfull');
    }

    return (
        <div id="page-reset">
            <div id="banner-reset">
                <div id="logo-container-reset">
                    <img src={logoImg} alt="Logotipo"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
            </div>

            <main id="reset-container">
                <div id="back-bar">
                    <Link to="/" >
                        <img src={backImg} alt="Voltar"/>
                    </Link>
                </div>

                <form>
                    <h1>Eita, esqueceu sua Senha?</h1>
                    <span>Não esquenta vamos dar um jeito nisso!</span>

                    <input type="text" placeholder="E-mail" onChange={e => setResetEmail(e.target.value)}/>

                    <button type="submit" onClick={handleResetPasswd}>Enviar</button>
                </form>
            </main>
        </div>
    );
}

export default ResetPassword;