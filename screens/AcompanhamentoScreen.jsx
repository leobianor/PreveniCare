import React from 'react';
import { View } from 'react-native';
import Acompanhamento from '../components/Acompanhamento';

const AcompanhamentoScreen = ({ route }) => {
    // Certifique-se de que route.params.medicamentos esteja definido
    const medicamentos = route.params?.medicamentos || [];

    const handleAdministrar = (medicamento) => {
        // Lógica para lidar com a administração do medicamento
        console.log(`Medicamento administrado: ${medicamento.nomeMedicamento}`);
    };

    return (
        <View>
            <Acompanhamento medicamentos={medicamentos} onAdministrar={handleAdministrar} />
        </View>
    );
};

export default AcompanhamentoScreen;
