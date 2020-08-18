import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';
import landingImage from '../../assets/images/landing.svg';
import studyIcons from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import logOutIcon from '../../assets/images/icons/log-out.svg'

import './styles.css'

function Landing(){
    const [totalConnections, setTotalConnections] = useState(0);

    const history = useHistory();

    function handleBackToLogin(){
        history.push('/');
    }

    function handleGoToProfile(){
        history.push('/profile');
    }

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        })
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                
                <header>
                    <div className="user-info" onClick={handleGoToProfile}>
                        <img src="https://avatars1.githubusercontent.com/u/36079245?s=460&v=4" alt="Usuário" />
                        <span>Lucas Vidigal</span>
                    </div>
                    
                    <img id="logout" src={logOutIcon} alt="sair" onClick={handleBackToLogin}/>
                </header>

                <div className="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua Plataformna de estudos online</h2>
                </div>

                <img src={landingImage} alt="Plataforma de estudos" className="hero-image" />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcons} alt="Estudar" />
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aula" />
                        Dar aula
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>
            </div>
        </div>
    );
}

export default Landing;