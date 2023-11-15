import React from 'react';
import { View, Text, FlatList } from 'react-native';

const MedicamentoList = ({ medicamentos }) => {
    return (
        <View>
            <Text>Lista de Medicamentos:</Text>
            <FlatList
                data={medicamentos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.nomeMedicamento}</Text>
                        <Text>Dosagem: {item.dosagem}</Text>
                        <Text>Horário: {item.horario}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default MedicamentoList;
