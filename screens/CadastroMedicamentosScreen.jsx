// CadastroMedicamentoScreen.js
import React, { useState, useEffect } from 'react';
import { View, Alert, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicamentoForm from '../components/MedicamentoForm';


const CadastroMedicamentoScreen = ({ navigation }) => {
    const [medicamentos, setMedicamentos] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    const handleSaveMedicamento = async (medicamento) => {
        try {
            const updatedMedicamentos = [...medicamentos, medicamento];
            setMedicamentos(updatedMedicamentos);

            await AsyncStorage.setItem('medicamentos', JSON.stringify(updatedMedicamentos));
        } catch (error) {
            console.error('Erro ao salvar os medicamentos:', error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedPacientes = await AsyncStorage.getItem('pacientes');
                if (storedPacientes) {
                    setPacientes(JSON.parse(storedPacientes));
                }

                const storedMedicamentos = await AsyncStorage.getItem('medicamentos');
                if (storedMedicamentos) {
                    setMedicamentos(JSON.parse(storedMedicamentos));
                }
            } catch (error) {
                console.error('Erro ao buscar os dados:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.containerPage}>
            <AntDesign name="arrowleft" size={24} color="#121A2C" onPress={() => navigation.navigate('Menu')}/>
            <Text style={styles.titleScreen}>Cadastro Medicamento</Text>
            <MedicamentoForm onSave={handleSaveMedicamento} pacientes={pacientes} />
        </View>
    );
};

export default CadastroMedicamentoScreen;
