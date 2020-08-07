import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const [isVisible, setIsVisable] = useState(false);

    function handleTooggleFiltersVisible() {
        setIsVisable(!isVisible);
    }

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });
                setFavorites(favoritedTeachersId);
            }
        });
    }

    async function handleFiltersSubmit(){
        loadFavorites();

        const response = await api.get('classes', {
            params:{
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
        setIsVisable(false);
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRigth={(
                    <BorderlessButton onPress={handleTooggleFiltersVisible}>
                        <Feather name="filter" size={20} color='#fff'/>
                    </BorderlessButton>
                )}
            >
                {isVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Qual a matéria?" 
                            placeholderTextColor="#c1bccc"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="Qual o dia?" 
                                    placeholderTextColor="#c1bccc"
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="Qual o horário?" 
                                    placeholderTextColor="#c1bccc"
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtar</Text>
                        </RectButton>
                    </View>)
                }
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {
                    teachers.map((teacher: Teacher) => {
                        return(
                            <TeacherItem 
                                key={teacher.id} 
                                teacher={teacher}
                                favorited={favorites.includes(teacher.id)}
                            />
                        );
                    })
                }
            </ScrollView>
        </View>
    );
}

export default TeacherList;