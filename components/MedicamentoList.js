// MedicamentoList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { styles } from '../style';

const MedicamentoList = ({ medicamentos, pacientes, onMedicamentoAplicado }) => {
    return (
        <View>
            <Text>Lista de Medicamentos:</Text>
            <FlatList
                data={medicamentos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const paciente = pacientes.find((p) => p.id === item.pacienteId) || {};
                    const formattedDate = format(new Date(item.horario), 'dd/MM/yyyy HH:mm');

                    return (
                        <View key={item.id}>
                            <Text>{item.nome}</Text>
                            <Text>Dosagem: {item.dosagem}</Text>
                            <Text>Horário: {formattedDate}</Text>
                            <Text>
                                Paciente: {paciente.nome} {paciente.sobrenome}
                            </Text>
                            <TouchableOpacity onPress={() => onMedicamentoAplicado(item)}>
                                <Text>Marcar como aplicado</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default MedicamentoList;
