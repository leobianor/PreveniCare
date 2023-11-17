import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const MedicamentoList = () => {
    const [medicamentos, setMedicamentos] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const fetchMedicamentos = async () => {
            try {
                // Buscar medicamentos do AsyncStorage
                const storedMedicamentos = await AsyncStorage.getItem('medicamentos');
                if (storedMedicamentos) {
                    setMedicamentos(JSON.parse(storedMedicamentos));
                }
            } catch (error) {
                console.error('Erro ao buscar os medicamentos:', error.message);
            }
        };

        const fetchPacientes = async () => {
            try {
                // Buscar pacientes do AsyncStorage
                const storedPacientes = await AsyncStorage.getItem('pacientes');
                if (storedPacientes) {
                    setPacientes(JSON.parse(storedPacientes));
                }
            } catch (error) {
                console.error('Erro ao buscar os pacientes:', error.message);
            }
        };

        fetchMedicamentos();
        fetchPacientes();
    }, []);

    return (
        <View>
            <Text>Lista de Medicamentos:</Text>
            <FlatList
                data={medicamentos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const paciente = pacientes.find((p) => p.id === item.pacienteId) || {};
                    const formattedDate = format(new Date(item.horario), 'dd/MM/yyyy HH:mm');

                    return (
                        <View>
                            <Text>{item.nome}</Text>
                            <Text>Dosagem: {item.dosagem}</Text>
                            <Text>Horário: {formattedDate}</Text>
                            <Text>
                                Paciente: {paciente.nome}{paciente.sobrenome}
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default MedicamentoList;
