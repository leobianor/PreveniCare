import React, { useState } from 'react';
import { View } from 'react-native';
import MedicamentoForm from '../components/MedicamentoForm';
import MedicamentoList from '../components/MedicamentoList';
import { AntDesign } from '@expo/vector-icons';

const CadastroMedicamentosScreen = ({ navigation }) => {
    const [medicamentos, setMedicamentos] = useState([]);

    const handleSaveMedicamento = (medicamento) => {
        setMedicamentos([...medicamentos, medicamento]);
    };

    return (
        <View>
            <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate('Menu')}/>
            <MedicamentoForm onSave={handleSaveMedicamento} />
        </View>
    );
};

export default CadastroMedicamentosScreen;
