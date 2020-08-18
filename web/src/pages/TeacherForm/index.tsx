import React, { useState, FormEvent } from  'react';
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';

function TeacherForm(){
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    const [scheduleItems, setScheduleItems] = useState([{week_day: 0, from: '', to: ''}]); 

    const history = useHistory();

    function addNewScheduleItem(){
        setScheduleItems([...scheduleItems, {week_day: 0, from: '', to: ''}]);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes', {
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            history.push('/class-successfull');
        }).catch(() => {
            alert('Erro no cadastro!');
        });
    }

    function setScheduleItemValue(postion: number, field:string, value:string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === postion){
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo pe preencher esse formulário de inscrição."  
                pageHeaderName="Dar Aulas" 
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <div id="user-grid">
                            <img src="https://avatars1.githubusercontent.com/u/36079245?s=460&v=4" alt="avatar" />
                            <span>Lucas Vidigal</span>
                            <Input name="whatsapp" label="Whatsapp" onChange={(e) => { setWhatsapp(e.target.value) }}/>
                        </div>
                        <Textarea name="bio" label="Biografia" onChange={(e) => { setBio(e.target.value) }}/>
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <div id="class-grid">
                            <Select 
                                name="subject" 
                                label="Matéria"
                                onChange={(e) => { setSubject(e.target.value) }}
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
                            <Input name="cost" label="Custo da sua hora por aula" onChange={(e) => { setCost(e.target.value) }}/>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return(
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        name="week_day" 
                                        label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />
                                    <Input name="from" label="Das" type="time" value={scheduleItem.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)}/>
                                    <Input name="to" label="Até" type="time" value={scheduleItem.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)}/>
                                </div>
                        )})}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                            Importante! <br />
                            Preencha todos os Dados
                        </p>

                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;