import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PacienteForm from '../components/PacienteForm';
import PacienteList from '../components/PacienteList';
import ModalInfo from '../components/ModalInfo';
import { styles } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroPacientesScreen = ({ navigation }) => {
    const [pacientes, setPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSavePaciente = async (pacientesArray) => {
        setPacientes(pacientesArray);
    };

    const handlePacientePress = (paciente) => {
        setSelectedPaciente(paciente);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedPaciente(null);
        setModalVisible(false);
    };

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const storedPacientes = await AsyncStorage.getItem('pacientes');
                const pacientesArray = storedPacientes ? JSON.parse(storedPacientes) : [];
                setPacientes(pacientesArray);
            } catch (error) {
                console.error('Erro ao buscar pacientes localmente:', error.message);
            }
        };

        fetchPacientes();
    }, []); // O segundo parâmetro vazio [] indica que este useEffect será executado apenas uma vez, quando o componente for montado.

    return (
        <View style={styles.containerPage}>
            <AntDesign name="arrowleft" size={24} color="#121A2C" onPress={() => navigation.navigate('Menu')} />
            <Text style={styles.titleScreen}>Cadastro Paciente</Text>
            <PacienteForm onSave={handleSavePaciente} />
            <PacienteList pacientes={pacientes} onPress={handlePacientePress} />
            <ModalInfo visible={modalVisible} paciente={selectedPaciente} onClose={handleCloseModal} setPacientes={setPacientes} />
        </View>
    );
};

export default CadastroPacientesScreen;
