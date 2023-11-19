// MedicamentoForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { styles } from '../style';
import { Picker } from '@react-native-picker/picker'; // Importe Picker do novo pacote

const MedicamentoForm = ({ onSave, pacientes }) => {
    const [nomeMedicamento, setNomeMedicamento] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [dataHorario, setDataHorario] = useState(new Date());
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);


    const togglePicker = () => {
        setPickerVisible(!pickerVisible);
    };

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
                    const updatedMedicamentos = paciente.medicamentos ? [...paciente.medicamentos, novoMedicamento] : [novoMedicamento];
                    return {
                        ...paciente,
                        medicamentos: updatedMedicamentos,
                    };
                }
                return paciente;
            });

            await AsyncStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
            onSave && onSave(novoMedicamento);

            setNomeMedicamento('');
            setDosagem('');
            setDataHorario(new Date());
            setSelectedPaciente(null);

            Alert.alert('Sucesso', 'Medicamento cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar o medicamento:', error.message);
        }
    };

    const placeholder = {
        label: 'Selecione uma opção...',
        value: null,
        color: '#bbb',
        fontsize: 20,
    };

    return (
        <View style={styles.containerPaciente}>
            <TextInput
                style={styles.inputForm}
                placeholder="Nome do Medicamento"
                value={nomeMedicamento}
                onChangeText={setNomeMedicamento}
            />
            <TextInput style={styles.inputForm} placeholder="Dosagem" value={dosagem} onChangeText={setDosagem} />

            <TouchableOpacity onPress={showDatePickerComponent}>
                <Text style={[styles.inputForm, { color: '#bbb' }]}>Escolher Data/Horário</Text>
            </TouchableOpacity>

            <View style={styles.DateTime}>
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
            </View>

            <View>
                <TouchableOpacity onPress={togglePicker}>
                    <Text style={[styles.inputForm, { color: '#bbb' }]}>Selecionar Paciente:</Text>
                </TouchableOpacity>

                {pickerVisible && (
                    <Picker
                        selectedValue={selectedPaciente}
                        onValueChange={(value) => setSelectedPaciente(value)}
                    >
                        <Picker.Item label="Selecione uma opção..." value={null} color="#bbb" />
                        {(pacientes && pacientes.length > 0) ? (
                            pacientes.map((paciente) => (
                                <Picker.Item key={paciente.id} label={`${paciente.nome} ${paciente.sobrenome} - ${paciente.cpf}`} value={paciente.id} />
                            ))
                        ) : <Picker.Item label="Nenhum paciente disponível" value={null} />}
                    </Picker>
                )}

            </View>

            <TouchableOpacity style={styles.buttonForm} onPress={handleSave}>
                <Text style={styles.textWite}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MedicamentoForm;
