import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Switch } from 'react-native';
import axios from 'axios';

const Acompanhamento = ({ medicamentos, onAdministrar }) => {
    const [administeredMedications, setAdministeredMedications] = useState([]);
    const [patients, setPatients] = useState([]);
    const [showOnlyElderly, setShowOnlyElderly] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/pacientes');
                setPatients(response.data);
            } catch (error) {
                console.error('Erro ao buscar os pacientes:', error.message);
            }
        };

        fetchData();
    }, []);

    const handleAdministrar = async (medicamento) => {
        try {
            // Atualiza o array de medicamentos administrados
            setAdministeredMedications([...administeredMedications, medicamento]);

            // Chama a função de administração do medicamento
            onAdministrar(medicamento);

            // Atualiza o estado no backend (opcional, dependendo da lógica do seu sistema)
            await axios.put(`http://localhost:3001/medicamentos/${medicamento.id}`, {
                administrado: true,
            });
        } catch (error) {
            console.error('Erro ao administrar o medicamento:', error.message);
        }
    };

    const filterPatients = () => {
        if (showOnlyElderly) {
            return patients.filter((patient) => patient.isIdoso);
        }
        return patients;
    };

    return (
        <View>
            <Text>Filtrar por Idosos:</Text>
            <Switch
                value={showOnlyElderly}
                onValueChange={() => setShowOnlyElderly(!showOnlyElderly)}
            />

            <Text>Lista de Pacientes:</Text>
            <FlatList
                data={filterPatients()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.nome} {item.sobrenome}</Text>
                        <Text>ID: {item.id}</Text>
                    </View>
                )}
            />

            <Text>Administração de Medicamentos:</Text>
            <FlatList
                data={medicamentos.filter((med) => !med.administrado)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.nomeMedicamento}</Text>
                        <Text>Dosagem: {item.dosagem}</Text>
                        <Text>Horário: {item.horario}</Text>
                        <Button title="Administrar" onPress={() => handleAdministrar(item)} />
                    </View>
                )}
            />

            <Text>Medicamentos Administrados:</Text>
            <FlatList
                data={administeredMedications}
                keyExtractor={(item) => item.id.toString()}
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

export default Acompanhamento;
