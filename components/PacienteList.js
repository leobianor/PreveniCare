import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const PacienteList = ({ pacientes, onPress }) => {
    return (
        <View>
            <Text>Lista de Pacientes:</Text>
            <FlatList
                data={pacientes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPress(item)}>
                        <View>
                            <Text>{item.nome}{item.sobrenome}</Text>
                            <Text>{item.cpf}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default PacienteList;
