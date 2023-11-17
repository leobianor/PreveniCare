import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from '../style';

const PacienteList = ({ pacientes, onPress }) => {
    return (
        <View style={styles.containerPaciente}>
            <Text style={styles.title}>Lista de Pacientes:</Text>
            <FlatList
                data={pacientes}
                keyExtractor={(item) => item.id.toString()} // Utiliza o id como chave única
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPress(item)}>
                        <View style={styles.pacienteItem}>
                            <Text style={styles.nomePaciente}>{`${item.nome} ${item.sobrenome}`}</Text>
                            <Text style={styles.nomePaciente}>{item.cpf}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default PacienteList;
