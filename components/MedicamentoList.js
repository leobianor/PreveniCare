import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const MedicamentoList = ({ medicamentos, pacientes }) => {
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
                        <View>
                            <Text>{item.nome}</Text>
                            <Text>Dosagem: {item.dosagem}</Text>
                            <Text>Horário: {formattedDate}</Text>
                            <Text>
                                Paciente: {paciente.nome}{paciente.sobrenome}
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default MedicamentoList;
