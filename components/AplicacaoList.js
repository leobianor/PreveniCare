// AplicacaoList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { styles } from '../style';

const AplicacaoList = ({ medicamentosAplicados, pacientes, onRemoverMedicacao }) => {
    return (
        <View>
            <Text>Lista de Medicamentos Aplicados:</Text>
            <FlatList
                data={medicamentosAplicados}
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
                            <TouchableOpacity onPress={() => onRemoverMedicacao(item)}>
                                <Text>Remover Medicamento</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default AplicacaoList;
