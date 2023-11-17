import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MedicamentoForm from '../components/MedicamentoForm';
import MedicamentoList from '../components/MedicamentoList';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroMedicamentosScreen = ({ navigation }) => {
    const [medicamentos, setMedicamentos] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    const handleSaveMedicamento = (medicamento) => {
        setMedicamentos([...medicamentos, medicamento]);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedPacientes = await AsyncStorage.getItem('pacientes');
                if (storedPacientes) {
                    setPacientes(JSON.parse(storedPacientes));
                }
            } catch (error) {
                console.error('Erro ao buscar os pacientes:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.containerPage}>
            <AntDesign name="arrowleft" size={24} color="#121A2C" onPress={() => navigation.navigate('Menu')}/>
            <MedicamentoForm onSave={handleSaveMedicamento} pacientes={pacientes} />
            <MedicamentoList medicamentos={medicamentos} pacientes={pacientes} />
        </View>
    );
};

export default CadastroMedicamentosScreen;
