import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PacienteForm from '../components/PacienteForm';
import PacienteList from '../components/PacienteList';
import ModalInfo from '../components/ModalInfo';
import { styles } from '../style';

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
        const fetchData = async () => {
            try {
                // Buscar pacientes localmente usando AsyncStorage
                const storedPacientes = await AsyncStorage.getItem('pacientes');
                if (storedPacientes) {
                    setPacientes(JSON.parse(storedPacientes));
                }
            } catch (error) {
                console.error('Erro ao buscar os pacientes:', error.message);
            }
        };

        fetchData();
    }, []); // Executa apenas uma vez ao montar o componente

    return (
        <View style={styles.containerPage}>
            <AntDesign name="arrowleft" size={24} color="#121A2C" onPress={() => navigation.navigate('Menu')}/>
            <PacienteForm onSave={handleSavePaciente} />
            <PacienteList pacientes={pacientes} onPress={handlePacientePress} />
            <ModalInfo visible={modalVisible} paciente={selectedPaciente} onClose={handleCloseModal} />
        </View>
    );
};

export default CadastroPacientesScreen;