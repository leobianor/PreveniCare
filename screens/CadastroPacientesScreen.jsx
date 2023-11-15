import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Modal, Button } from 'react-native';
import PacienteForm from '../components/PacienteForm';
import PacienteList from '../components/PacienteList';
import ModalInfo from '../components/ModalInfo';
import axios from 'axios'; 
import { AntDesign } from '@expo/vector-icons';

const CadastroPacientesScreen = ({ navigation }) => {
    const [pacientes, setPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSavePaciente = async (paciente) => {
        try {
            const response = await axios.post('http://localhost:3001/pacientes', paciente);
            setPacientes([...pacientes, response.data]);
        } catch (error) {
            console.error('Erro ao salvar o paciente:', error.message);
        }
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
                const response = await axios.get('https://my-json-server.typicode.com/leobianor/api-PreveniCare/pacientes');
                setPacientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar os pacientes:', error.message);
            }
        };

        fetchData();
    }, []); // Executa apenas uma vez ao montar o componente

    return (
        <View>
            <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate('Menu')}/>
            
            <PacienteForm onSave={handleSavePaciente} />
            <PacienteList pacientes={pacientes} onPress={handlePacientePress} />
            <ModalInfo visible={modalVisible} paciente={selectedPaciente} onClose={handleCloseModal} />
        </View>
    );
};

export default CadastroPacientesScreen;
