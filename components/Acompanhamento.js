// Acompanhamento.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../style';

const Acompanhamento = () => {
    const [medicamentos, setMedicamentos] = useState([]);

    useEffect(() => {
        carregarMedicamentos();
    }, []);

    const carregarMedicamentos = async () => {
        try {
            // Obter a lista de medicamentos do AsyncStorage
            const medicamentosAtuais = await AsyncStorage.getItem('medicamentos');
            const listaMedicamentos = medicamentosAtuais ? JSON.parse(medicamentosAtuais) : [];

            // Filtrar para mostrar apenas medicamentos com pacientes idosos
            const medicamentosFiltrados = listaMedicamentos.filter((med) => med.paciente.isIdoso);

            setMedicamentos(medicamentosFiltrados);
        } catch (error) {
            console.error('Erro ao carregar medicamentos:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.nome}</Text>
            <Text>Paciente: {item.paciente.nome} {item.paciente.sobrenome}</Text>
        </View>
    );

    return (
        <View style={styles.containerPage}>
            <Text style={styles.title}>Acompanhamento de Medicamentos</Text>
            <FlatList
                data={medicamentos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default Acompanhamento;
