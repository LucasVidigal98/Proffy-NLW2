import React, { useState, useEffect } from 'react';
import { useHistory, RouteComponentProps } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';
import landingImage from '../../assets/images/landing.svg';
import studyIcons from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import logOutIcon from '../../assets/images/icons/log-out.svg'

import './styles.css';

const Landing:React.FC<RouteComponentProps> = ({location}) => {
    const [totalConnections, setTotalConnections] = useState(0);
    const [userId, setUserId] = useState(0);
    const [userInfo, setUserInfo] = useState({
        id: 0,
        name:'',
        middlename:'',
        email:'',
        avatar:'',
        whatsapp:'',
        bio:''
    });

    const history = useHistory();

    function handleBackToLogin(){
        history.push('/');
    }

    function handleGoToProfile(){
        history.push('profile', {
            state: userInfo
        });
    }

    function handleGiveClasses(){
        history.push('give-classes', {
            info: userInfo
        });
    }

    useEffect(() => { 
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        });
    }, []);

    useEffect(() => {
        setUserId(location.state as number);
        const id = userId;
       
        api.get('user-info', {
            params:{
                id
            }
        }).then(response => {
            const userInfoAux = {
                id: userId,
                name: response.data.name,
                middlename: response.data.middlename,
                email: response.data.email,
                avatar: response.data.avatar,
                whatsapp: response.data.whatsapp,
                bio: response.data.bio
            }

            setUserInfo(userInfoAux);
        });

    }, [location.state, userId]);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                
                <header>
                    <div className="user-info" onClick={handleGoToProfile}>
                        <img src={userInfo.avatar} alt="Avatar" />
                        <span>{userInfo.name + ' ' + userInfo.middlename}</span>
                    </div>
                    
                    <img id="logout" src={logOutIcon} alt="sair" onClick={handleBackToLogin}/>
                </header>

                <div className="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua Plataformna de estudos online</h2>
                </div>

                <img src={landingImage} alt="Plataforma de estudos" className="hero-image" />

                <div className="buttons-container">
                    <button className="study">
                        <img src={studyIcons} alt="Estudar" />
                        Estudar
                    </button>

                    <button className="give-classes" onClick={handleGiveClasses}>
                        <img src={giveClassesIcon} alt="Dar aula" />
                        Dar aula
                    </button>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>
            </div>
        </div>
    );
}

export default Landing;