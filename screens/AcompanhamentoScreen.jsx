// AcompanhamentoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicamentoForm from '../components/MedicamentoForm';

const AcompanhamentoScreen = ({ navigation }) => {
    const [medicamentos, setMedicamentos] = useState([]);
    const [medicamentosAplicados, setMedicamentosAplicados] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [dadosCarregados, setDadosCarregados] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedMedicamentos = await AsyncStorage.getItem('medicamentos');
                if (storedMedicamentos) {
                    setMedicamentos(JSON.parse(storedMedicamentos));
                }

                const storedMedicamentosAplicados = await AsyncStorage.getItem('medicamentosAplicados');
                if (storedMedicamentosAplicados) {
                    setMedicamentosAplicados(JSON.parse(storedMedicamentosAplicados));
                }

                const storedPacientes = await AsyncStorage.getItem('pacientes');
                if (storedPacientes) {
                    setPacientes(JSON.parse(storedPacientes));
                }

                setDadosCarregados(true);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error.message);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    const getPacienteNome = (pacienteId) => {
        const paciente = pacientes.find((p) => p.id === pacienteId);
        return paciente ? `${paciente.nome} ${paciente.sobrenome}` : 'Paciente não encontrado';
    };

    const handleMedicamentoAplicado = async (medicamento) => {
        try {
            const updatedMedicamentos = medicamentos.filter((m) => m.id !== medicamento.id);
            setMedicamentos(updatedMedicamentos);
            await AsyncStorage.setItem('medicamentos', JSON.stringify(updatedMedicamentos));

            const updatedMedicamentosAplicados = [...medicamentosAplicados, medicamento];
            setMedicamentosAplicados(updatedMedicamentosAplicados);
            await AsyncStorage.setItem('medicamentosAplicados', JSON.stringify(updatedMedicamentosAplicados));
        } catch (error) {
            console.error('Erro ao aplicar o medicamento:', error.message);
        }
    };

    const handleRemoverMedicamentoAplicado = async (medicamento) => {
        try {
            const updatedMedicamentosAplicados = medicamentosAplicados.filter((m) => m.id !== medicamento.id);
            setMedicamentosAplicados(updatedMedicamentosAplicados);
            await AsyncStorage.setItem('medicamentosAplicados', JSON.stringify(updatedMedicamentosAplicados));
        } catch (error) {
            console.error('Erro ao remover o medicamento aplicado:', error.message);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.medicamentoItem}>
            <Text>Medicação: {`${item.nome}`}</Text>
            <Text>Dosagem: {`${item.dosagem}`}</Text>
            <Text>Data/Horário: {formatDate(item.horario)}</Text>
            <Text>Paciente: {getPacienteNome(item.pacienteId)}</Text>
            <TouchableOpacity onPress={() => handleMedicamentoAplicado(item)}>
                <Text>Aplicar</Text>
            </TouchableOpacity>
        </View>
    );

    const renderMedicamentoAplicadoItem = ({ item }) => (
        <View style={styles.medicamentoItem}>
            <Text>Medicação: {`${item.nome}`}</Text>
            <Text>Dosagem: {`${item.dosagem}`}</Text>
            <Text>Data/Horário: {formatDate(item.horario)}</Text>
            <Text>Paciente: {getPacienteNome(item.pacienteId)}</Text>
            <TouchableOpacity onPress={() => handleRemoverMedicamentoAplicado(item)}>
                <Text>Remover</Text>
            </TouchableOpacity>
        </View>
    );

    if (!dadosCarregados) {
        return (
            <View style={styles.containerPage}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.containerPage}>
            <AntDesign name="arrowleft" size={24} color="#121A2C" onPress={() => navigation.navigate('Menu')} />
            <Text style={styles.titulo}>Acompanhamento</Text>

            <View>
                <Text style={styles.subtitulo}>Medicamentos Cadastrados:</Text>
                <FlatList
                    data={medicamentos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <View>
                <Text style={styles.subtitulo}>Medicamentos Aplicados:</Text>
                <FlatList
                    data={medicamentosAplicados}
                    renderItem={renderMedicamentoAplicadoItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );
};

export default AcompanhamentoScreen;
