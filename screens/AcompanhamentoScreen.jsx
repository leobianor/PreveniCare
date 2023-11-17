import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedicamentoList from '../components/MedicamentoList';

const AcompanhamentoScreen = ({ navigation }) => {
    const [medicamentos, setMedicamentos] = useState([]);
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedMedicamentos = await AsyncStorage.getItem('medicamentos');
                if (storedMedicamentos) {
                    setMedicamentos(JSON.parse(storedMedicamentos));
                }

                const storedPacientes = await AsyncStorage.getItem('pacientes');
                if (storedPacientes) {
                    setPacientes(JSON.parse(storedPacientes));
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
            <MedicamentoList medicamentos={medicamentos} pacientes={pacientes} />
        </View>
    );
};

export default AcompanhamentoScreen;
