import React from  'react';
import { Link } from 'react-router-dom';

import sucessImg from '../../assets/images/icons/success-check-icon.svg';

function ResetSuccessfull(){
    return (
        <div id="page-successfull">
            <img src={sucessImg} alt="Sucesso" />
            <h1>Redefinição Enviada!</h1>
            <p>Boa, agora é só checar o e-mail que foi enviado para você</p>
            <p>redefinir sua senha e aproveitar os estudos.</p>
            <Link to="/">Voltar ao login</Link>
        </div>
    );
}

export default ResetSuccessfull;