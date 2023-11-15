import React, { useState } from 'react';
import { View, TextInput, Button, Switch, Text } from 'react-native';
import axios from 'axios';

const PacienteForm = () => {
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
    const [isIdoso, setIsIdoso] = useState(false);

    const formatarCPF = (inputCPF) => {
        // Remove qualquer caractere que não seja número
        const cleaned = inputCPF.replace(/\D/g, '');

        // Adiciona a formatação desejada (XXX.XXX.XXX-XX)
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        setCpf(match ? `${match[1]}.${match[2]}.${match[3]}-${match[4]}` : inputCPF);
    };

    const formatarTelefone = (inputTelefone) => {
        // Remove qualquer caractere que não seja número
        const cleaned = inputTelefone.replace(/\D/g, '');

        // Adiciona a formatação desejada (XX) XXXXX-XXXX
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        setTelefone(match ? `(${match[1]}) ${match[2]}-${match[3]}` : inputTelefone);
    };

    const handleSave = async () => {
        // Validações usando expressões regulares
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

        if (!cpfRegex.test(cpf)) {
            console.error('CPF inválido');
            return;
        }

        if (!emailRegex.test(email)) {
            console.error('E-mail inválido');
            return;
        }

        if (!telefoneRegex.test(telefone)) {
            console.error('Telefone inválido');
            return;
        }

        try {
            const response = await axios.post('https://my-json-server.typicode.com/leobianor/api-PreveniCare/pacientes', {
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
                isIdoso,
            });

            console.log('Paciente salvo com sucesso:', response.data);

            // Limpar os campos após salvar
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
            setIsIdoso(false);
        } catch (error) {
            console.error('Erro ao salvar o paciente:', error.message);
        }
    };

    return (
        <View>
            <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
            <TextInput placeholder="Sobrenome" value={sobrenome} onChangeText={setSobrenome} />
            <TextInput placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />

            <TextInput
                placeholder="CPF"
                value={cpf}
                onChangeText={(text) => formatarCPF(text)}
                keyboardType="numeric"
            />
            <TextInput placeholder="Endereço" value={endereco} onChangeText={setEndereco} />

            <TextInput
                placeholder="Telefone"
                value={telefone}
                onChangeText={(text) => formatarTelefone(text)}
                keyboardType="phone-pad"
            />

            <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput placeholder="Doenças Anteriores" value={doencasAnteriores} onChangeText={setDoencasAnteriores} />
            <TextInput placeholder="Alergias" value={alergias} onChangeText={setAlergias} />
            <TextInput placeholder="Histórico Médico" value={historicoMedico} onChangeText={setHistoricoMedico} />
            <TextInput placeholder="Contato de Emergência" value={contatoEmergencia} onChangeText={setContatoEmergencia} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>É idoso?</Text>
                <Switch value={isIdoso} onValueChange={() => setIsIdoso(!isIdoso)} />
            </View>

            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
};

export default PacienteForm;
