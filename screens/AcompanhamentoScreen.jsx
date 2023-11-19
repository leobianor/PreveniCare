// AcompanhamentoScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalInfo from '../components/ModalInfo';

const AcompanhamentoScreen = ({ navigation }) => {
    const [medicamentos, setMedicamentos] = useState([]);
    const [medicamentosAplicados, setMedicamentosAplicados] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [dadosCarregados, setDadosCarregados] = useState(false);
    const [mostrarApenasIdosos, setMostrarApenasIdosos] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

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

    const renderItem = ({ item }) => {
        if (mostrarApenasIdosos && !getPacienteNome(item.pacienteId).isIdoso) {
            return null;
        }

        return (
            <View>
                <Text style={styles.textMedicamento}>Medicação: {`${item.nome}`}</Text>
                <Text style={styles.textMedicamento}>Dosagem: {`${item.dosagem}`}</Text>
                <Text style={styles.textMedicamento}>Data/Horário: {formatDate(item.horario)}</Text>
                <TouchableOpacity onPress={() => abrirModalInfoPaciente(item.pacienteId)}>
                    <Text style={styles.textMedicamento}>Nome do Paciente: {getPacienteNome(item.pacienteId)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAplicar} onPress={() => handleMedicamentoAplicado(item)}>
                    <Text style={[styles.textMedicamento, { textAlign: 'center', color: '#fff' }]}>Medicação Aplicada</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderMedicamentoAplicadoItem = ({ item }) => {
        if (mostrarApenasIdosos && !getPacienteNome(item.pacienteId).isIdoso) {
            return null;
        }

        return (
            <View>
                <Text style={styles.textMedicamento}>Medicação: {`${item.nome}`}</Text>
                <Text style={styles.textMedicamento}>Dosagem: {`${item.dosagem}`}</Text>
                <Text style={styles.textMedicamento}>Data/Horário: {formatDate(item.horario)}</Text>
                <TouchableOpacity onPress={() => abrirModalInfoPaciente(item.pacienteId)}>
                    <Text style={styles.textMedicamento}>Nome do Paciente: {getPacienteNome(item.pacienteId)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRemover} onPress={() => handleRemoverMedicamentoAplicado(item)}>
                    <Text style={[styles.textMedicamento, { textAlign: 'center', color: '#fff' }]}>Remover</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const abrirModalInfoPaciente = (pacienteId) => {
        const pacienteSelecionado = pacientes.find((p) => p.id === pacienteId);
        setPacienteSelecionado(pacienteSelecionado);
        setModalInfoVisible(true);
    };

    const toggleFiltroIdosos = () => {
        setMostrarApenasIdosos(!mostrarApenasIdosos);
    };

    const renderSeparator = () => (
        <View
            style={{
                height: 0.5,
                width: '100%',
                backgroundColor: '#bbb',
                marginVertical: 10,
            }}
        />
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
            <Text style={styles.titleScreen}>Acompanhamento</Text>

            <View style={styles.containerAcompanhamento}>
                <TouchableOpacity style={styles.buttonFiltro} onPress={toggleFiltroIdosos}>
                    <Text style={styles.filtroTexto}>
                        {mostrarApenasIdosos ? 'Mostrar Todos' : 'Mostrar Apenas Idosos'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerAcompanhamento}>
                <Text style={styles.subtitle}>Medicamentos Cadastrados:</Text>
                {medicamentos.length === 0 ? (
                    <Text style={styles.textNull}>Nenhuma medicação cadastrada</Text>
                ) : (
                    <FlatList
                        style={styles.medicamento}
                        data={medicamentos}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={renderSeparator}
                    />
                )}
            </View>

            <View style={styles.containerAcompanhamento}>
                <Text style={styles.subtitle}>Medicamentos Aplicados:</Text>
                {medicamentosAplicados.length === 0 ? (
                    <Text style={styles.textNull}>Nenhuma medicação aplicada</Text>
                ) : (
                    <FlatList
                        data={medicamentosAplicados}
                        renderItem={renderMedicamentoAplicadoItem}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={renderSeparator}
                    />
                )}
            </View>
            <ModalInfo
                visible={modalInfoVisible}
                paciente={pacienteSelecionado}
                onClose={() => {
                    setModalInfoVisible(false);
                    setPacienteSelecionado(null);
                }}
            />
        </View>
    );
};

export default AcompanhamentoScreen;
