import React from 'react';
import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import camIcon from '../../assets/images/icons/camera.svg';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function Profile(){
   return(
        <div id="page-profile" >
            <PageHeader pageHeaderName="Meu Perfil" profileHeader>
                <div id="image-profile">
                    <div id="image-container">
                        <img id="avatar" src="https://avatars1.githubusercontent.com/u/36079245?s=460&v=4" alt="Usuário" />
                    
                        <img id="change-avatar" src={camIcon} alt="Alterar foto" />
                    </div>

                    <span>Lucas Vidigal</span>
                    <span>Geografia</span>
                </div>
            </PageHeader>

            <main>
                <form>
                    <fieldset id="user-data">
                        <legend>Seus Dados</legend>
                        <div id="names">
                            <Input name="name" label="Nome" id="name" />
                            <Input name="middle-name" label="Sobrenome" id="middle-name"/>
                        </div>
                        
                        <div id="contact">
                            <Input name="email" label="E-mail" id="email"/>
                            <Input name="whatsapp" label="Whatsapp" id="wpp"/>
                        </div>

                        <Textarea name="bio" label="Biografia" id="bio"/>
                    </fieldset>

                    <fieldset id="about">
                        <legend>Sobre a aula</legend>

                        <div id="subject-info">
                            <Select 
                                name="subject" 
                                label="Matéria"
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