import React from 'react';
import { Link } from 'react-router-dom';

import sucessImg from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

function Successfull(){
    return(
        <div id="page-successfull">
            <img src={sucessImg} alt="Sucesso" />
            <h1>Cadastro concluído</h1>
            <p>Agora você faz parte da plataforma da Proffy.</p>
            <p>Tenha uma ótima experiência.</p>
            <Link to="/">Fazer Login</Link>
        </div>
    );
}

export default Successfull;