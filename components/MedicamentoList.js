import React from 'react';
import { View, Text, FlatList } from 'react-native';

const MedicamentoList = ({ medicamentos, pacientes }) => {
    return (
        <View>
            <Text>Lista de Medicamentos:</Text>
            <FlatList
                data={medicamentos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text>{item.nome}</Text>
                            <Text>Dosagem: {item.dosagem}</Text>
                            <Text>Horário: {item.horario}</Text>
                            {item.pacienteId && pacientes && pacientes.length > 0 && (
                                <Text>
                                    Paciente: {pacientes.find((p) => p.id === item.pacienteId)?.nome || 'Não encontrado'}
                                </Text>
                            )}
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default MedicamentoList;
