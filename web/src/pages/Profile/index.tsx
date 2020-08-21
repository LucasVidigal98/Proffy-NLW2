import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import camIcon from '../../assets/images/icons/camera.svg';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

const Profile:React.FC<RouteComponentProps> = ({location}) => {
    const [subject, setSubject] = useState('Artes');
    const [userInfo, setUserInfo] = useState({
        state:{
            id: 0,
            name:'',
            middlename:'',
            email:'',
            avatar:'',
            whatsapp:'',
            bio:''
        }
    });

    useEffect(() => {
        setUserInfo(location.state as any);
    }, [location.state, userInfo]);

   return(
        <div id="page-profile" >
            <PageHeader pageHeaderName="Meu Perfil" profileHeader>
                <div id="image-profile">
                    <div id="image-container">
                        <img id="avatar" src={userInfo.state.avatar} alt="Usuário" />
                    
                        <img id="change-avatar" src={camIcon} alt="Alterar foto" />
                    </div>

                    <span>{userInfo.state.name + ' ' + userInfo.state.middlename}</span>
                    <span>{subject}</span>
                </div>
            </PageHeader>

            <main>
                <form>
                    <fieldset id="user-data">
                        <legend>Seus Dados</legend>
                        <div id="names">
                            <Input name="name" label="Nome" id="name" value={userInfo.state.name} />
                            <Input name="middle-name" label="Sobrenome" id="middle-name" value={userInfo.state.middlename} />
                        </div>
                        
                        <div id="contact">
                            <Input name="email" label="E-mail" id="email" value={userInfo.state.email} />
                            <Input name="whatsapp" label="Whatsapp" id="wpp" value={userInfo.state.whatsapp} />
                        </div>

                        <Textarea name="bio" label="Biografia" id="bio" value={userInfo.state.bio} />
                    </fieldset>

                    <fieldset id="about">
                        <legend>Sobre a aula</legend>

                        <div id="subject-info">
                            <Select 
                                name="subject" 
                                label="Matéria"
                                onChange={ e => setSubject(e.target.value) }
                                value={subject}
                                options={[
                                    { value: 'Artes', label: 'Artes' },
                                    { value: 'Biologia', label: 'Biologia' },
                                    { value: 'Ciências', label: 'Ciências' },
                                    { value: 'Educação Física', label: 'Educação Física' },
                                    { value: 'Física', label: 'Física' },
                                    { value: 'Geografia', label: 'Geografia' },
                                    { value: 'História', label: 'História' },
                                ]}
                            />

                            <Input name="cost" label="Custo da sua hora por aula" />
                        </div>
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                            Importante! <br />
                            Preencha todos os Dados
                        </p>

                        <button type="submit">
                            Salvar perfil
                        </button>
                    </footer>
                </form>
            </main>
        </div>
   );
}

export default Profile;