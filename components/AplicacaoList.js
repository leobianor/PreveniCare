// AplicacaoList.js

import React from 'react';
import { View, Text, FlatList } from 'react-native';

const AplicacaoList = ({ medicamentos, pacientes }) => {
    return (
        <View>
            <Text>Lista de Medicamentos Aplicados:</Text>
            <FlatList
                data={medicamentos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.nome}</Text>
                        <Text>Dosagem: {item.dosagem}</Text>
                        <Text>Horário: {item.horario}</Text>
                        {item.pacienteId && pacientes && pacientes.length > 0 && (
                            <Text>
                                Paciente: {pacientes.find((p) => p.id === item.pacienteId)?.nomeCompleto}
                            </Text>
                        )}
                        {/* Adicione outros detalhes necessários aqui */}
                    </View>
                )}
            />
        </View>
    );
};

export default AplicacaoList;
