import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { v4 as uuidv4 } from 'uuid';
import { styles } from '../style';

const MedicamentoForm = ({ onSave, pacientes }) => {
    const [nomeMedicamento, setNomeMedicamento] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [dataHorario, setDataHorario] = useState(new Date());
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const showDatePickerComponent = () => {
        setShowDatePicker(true);
    };

    const hideDatePickerComponent = () => {
        setShowDatePicker(false);
    };

    const handleDateChange = (event, selectedDate) => {
        hideDatePickerComponent();
        if (selectedDate) {
            setDataHorario(selectedDate);
        }
    };

    const handleSave = async () => {
        try {
            if (!selectedPaciente) {
                Alert.alert('Erro', 'Por favor, selecione um paciente.');
                return;
            }

            const novoMedicamento = {
                id: uuidv4(),
                nome: nomeMedicamento,
                dosagem,
                horario: dataHorario.toISOString(),
                pacienteId: selectedPaciente,
            };

            const updatedPacientes = pacientes.map((paciente) => {
                if (paciente.id === selectedPaciente) {
                    return {
                        ...paciente,
                        medicamentos: [...(paciente.medicamentos || []), novoMedicamento],
                    };
                }
                return paciente;
            });

            await AsyncStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
            onSave(novoMedicamento);

            const updatedMedicamentos = [...medicamentos, novoMedicamento];
            await AsyncStorage.setItem('medicamentos', JSON.stringify(updatedMedicamentos));

            setNomeMedicamento('');
            setDosagem('');
            setDataHorario(new Date());
            setSelectedPaciente(null);

            Alert.alert('Sucesso', 'Medicamento cadastrado com sucesso!');
            console.log('Medicamento cadastrado:', novoMedicamento);
        } catch (error) {
            console.error('Erro ao salvar o medicamento:', error.message);
        }
    };
    return (
        <View>
            <TextInput
                placeholder="Nome do Medicamento"
                value={nomeMedicamento}
                onChangeText={setNomeMedicamento}
            />
            <TextInput placeholder="Dosagem" value={dosagem} onChangeText={setDosagem} />

            <TouchableOpacity onPress={showDatePickerComponent}>
                <Text>Escolher Data/Horário</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dataHorario}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <View style={{ marginBottom: 20 }}>
                <Text>Selecionar Paciente:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedPaciente(value)}
                    items={(pacientes && pacientes.length > 0) ? (
                        pacientes.map((paciente) => ({
                            label: `${paciente.nome} - ${paciente.cpf}`,
                            value: paciente.id,
                        }))
                    ) : [{ label: 'Nenhum paciente disponível', value: null }]}
                />
            </View>

            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
};

export default MedicamentoForm;