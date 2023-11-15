import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';

const MedicamentoForm = ({ onSave }) => {
    const [nomeMedicamento, setNomeMedicamento] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [dataHorario, setDataHorario] = useState(new Date());
    const [pacientes, setPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/pacientes');
                setPacientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar os pacientes:', error.message);
            }
        };

        fetchData();
    }, []);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        setDataHorario(date);
        hideDatePicker();
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:3001/medicamentos', {
                nome: nomeMedicamento,
                dosagem,
                horario: dataHorario.toISOString(), // Converte a data para string ISO
                pacienteId: selectedPaciente,
            });

            // Atualizar o array de medicamentos no paciente
            const updatedPacientes = pacientes.map((paciente) => {
                if (paciente.id === selectedPaciente) {
                    return {
                        ...paciente,
                        medicamentos: [...(paciente.medicamentos || []), response.data],
                    };
                }
                return paciente;
            });

            setPacientes(updatedPacientes);
            setNomeMedicamento('');
            setDosagem('');
            setDataHorario(new Date());
            setSelectedPaciente(null);
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

            <View>
                <Text>Escolher Data/Horário:</Text>
                <TouchableOpacity onPress={showDatePicker}>
                    <Text>{dataHorario.toLocaleString()}</Text>
                </TouchableOpacity>
            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />

            {/* Dropdown para escolher o paciente */}
            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
};

export default MedicamentoForm;
