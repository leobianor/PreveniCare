import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { Picker } from '@react-native-picker/picker'; // Importe Picker do novo pacote
import { styles } from '../style';

const PacienteForm = ({ onSave }) => {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [idade, setIdade] = useState('');
    const [cpf, setCpf] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [doencasAnteriores, setDoencasAnteriores] = useState('');
    const [alergias, setAlergias] = useState('');
    const [historicoMedico, setHistoricoMedico] = useState('');
    const [contatoEmergencia, setContatoEmergencia] = useState('');
    const [sexo, setSexo] = useState(''); // Adiciona o estado para o sexo
    const [pickerVisible, setPickerVisible] = useState(false); // Novo estado para controlar a visibilidade do Picker

    const togglePicker = () => {
        setPickerVisible(!pickerVisible);
    };


    const formatarCPF = (inputCPF) => {
        const cleaned = inputCPF.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        setCpf(match ? `${match[1]}.${match[2]}.${match[3]}-${match[4]}` : inputCPF);
    };

    const formatarTelefone = (inputTelefone) => {
        const cleaned = inputTelefone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        setTelefone(match ? `(${match[1]}) ${match[2]}-${match[3]}` : inputTelefone);
    };

    const handleSave = async () => {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

        if (!cpfRegex.test(cpf)) {
            alert('CPF inválido');
            return;
        }

        if (!emailRegex.test(email)) {
            alert('E-mail inválido');
            return;
        }

        if (!telefoneRegex.test(telefone)) {
            alert('Telefone inválido');
            return;
        }

        try {
            const pacienteData = {
                id: uuidv4(),
                nome,
                sobrenome,
                idade,
                cpf,
                endereco,
                telefone,
                email,
                doencasAnteriores,
                alergias,
                historicoMedico,
                contatoEmergencia,
                isIdoso: idade >= 60, // Definir isIdoso com base na idade (true se idade >= 60, false caso contrário)
                sexo, // Adicionar a informação de sexo
            }

            const storedPacientes = await AsyncStorage.getItem('pacientes');
            const pacientesArray = storedPacientes ? JSON.parse(storedPacientes) : [];
            pacientesArray.push(pacienteData);

            await AsyncStorage.setItem('pacientes', JSON.stringify(pacientesArray));

            console.log('Paciente salvo localmente com sucesso:', pacienteData);

            // Limpar os campos após salvar
            setId('');
            setNome('');
            setSobrenome('');
            setIdade('');
            setCpf('');
            setEndereco('');
            setTelefone('');
            setEmail('');
            setDoencasAnteriores('');
            setAlergias('');
            setHistoricoMedico('');
            setContatoEmergencia('');
            setSexo('');

            // Chamar a função onSave passando os dados do paciente
            onSave(pacientesArray);
        } catch (error) {
            console.error('Erro ao salvar o paciente localmente:', error.message);
        }
    };

    return (
        <View style={styles.containerPaciente}>
            <TextInput style={styles.inputForm} placeholder="Nome" value={nome} onChangeText={setNome} />
            <TextInput style={styles.inputForm} placeholder="Sobrenome" value={sobrenome} onChangeText={setSobrenome} />
            <TextInput style={styles.inputForm} placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />

            <TextInput
                style={styles.inputForm}
                placeholder="CPF"
                value={cpf}
                onChangeText={(text) => formatarCPF(text)}
                keyboardType="numeric"
            />

            <TouchableOpacity onPress={togglePicker}>
                <Text style={[styles.inputForm, { color: sexo ? '#121212' : '#bbb' }]}>{sexo ? sexo : 'Selecionar Sexo'}</Text>
            </TouchableOpacity>

            {pickerVisible && (
                <View style={styles.inputForm}>
                    <Text >Sexo:</Text>
                    <Picker
                        selectedValue={sexo}
                        onValueChange={(itemValue) => setSexo(itemValue)}
                    >
                        <Picker.Item label="Selecione o sexo" value="" />
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Feminino" value="Feminino" />
                    </Picker>
                </View>
            )}


            <TextInput style={styles.inputForm} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />

            <TextInput
                style={styles.inputForm}
                placeholder="Telefone"
                value={telefone}
                onChangeText={(text) => formatarTelefone(text)}
                keyboardType="phone-pad"
            />

            <TextInput style={styles.inputForm} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput style={styles.inputForm} placeholder="Doenças Anteriores" value={doencasAnteriores} onChangeText={setDoencasAnteriores} />
            <TextInput style={styles.inputForm} placeholder="Alergias" value={alergias} onChangeText={setAlergias} />
            <TextInput style={styles.inputForm} placeholder="Histórico Médico" value={historicoMedico} onChangeText={setHistoricoMedico} />
            <TextInput style={styles.inputForm} placeholder="Contato de Emergência" value={contatoEmergencia} onChangeText={setContatoEmergencia} />


            

            <TouchableOpacity style={styles.buttonForm} onPress={handleSave}>
                <Text style={styles.textWite}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PacienteForm;
