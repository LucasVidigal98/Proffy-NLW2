import React, { useState, FormEvent } from  'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';
import backImg from '../../assets/images/icons/back.svg';

import './styles.css';

function Register(){
    const [name, setName] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    const history = useHistory();

    async function handleRegister(e: FormEvent){
        e.preventDefault();

        if(name === '' || middlename === '' || email === '' || passwd === ''){
            alert('Preencha todos os campos para fazer os cadastro');
        }else{
            const response = await api.post('user-create', {
                name,
                middlename,
                email,
                passwd
            });
    
            if(response.status !== 201){
                alert('Erro ao cadastrar !')
            }else{
                history.push('/sucessfull');
            }
        }
    }

    return (
        <div id="page-register">
            <div id="banner-register">
                <div id="logo-container-register">
                    <img src={logoImg} alt="Logotipo"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
            </div>

            <main id="register-container">
                <div id="back-bar">
                    <Link to="/" >
                        <img src={backImg} alt="Voltar"/>
                    </Link>
                </div>

                <form>
                    <h1>Cadastro</h1>
                    <span>Preencha os dados abaixo para começar.</span>

                    <input type="text" placeholder="Nome" id="inital-input" onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="Sobrenome" onChange={e => setMiddlename(e.target.value)} />
                    <input type="text" placeholder="E-mail" onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" id="final-input" onChange={e => setPasswd(e.target.value)} />

                    <button type="submit" onClick={handleRegister}>Concluir cadastro</button>
                </form>
            </main>
        </div>
    );
}

export default Register;