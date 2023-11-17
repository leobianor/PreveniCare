import React from 'react';
import { View, Text, Modal, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../style';

const ModalInfo = ({ visible, paciente, onClose }) => {
    if (!paciente) {
        return null;
    }

    const removerPaciente = async () => {
        Alert.alert(
            'Remover Paciente',
            `Tem certeza que deseja remover o paciente ${paciente.nome} ${paciente.sobrenome}?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Remover',
                    onPress: async () => {
                        try {
                            const pacientesAtuais = await AsyncStorage.getItem('pacientes');
                            const pacientes = pacientesAtuais ? JSON.parse(pacientesAtuais) : [];

                            // Filtrar a lista para manter apenas os pacientes que não correspondem ao paciente a ser removido
                            const novaListaPacientes = pacientes.filter(
                                (p) => p.nome !== paciente.nome || p.sobrenome !== paciente.sobrenome
                            );

                            await AsyncStorage.setItem('pacientes', JSON.stringify(novaListaPacientes));

                            onClose();
                        } catch (error) {
                            console.error('Erro ao remover paciente:', error);
                        }
                    },
                },
            ]
        );
    };


    return (
        <Modal animationType="slide" transparent={false} visible={visible}>
            <View style={[styles.container, styles.containerPaciente]}>
                <Text style={styles.title}>Informações do Paciente:</Text>
                <Text style={styles.nomePaciente}>Nome: {paciente.nome} {paciente.sobrenome}</Text>
                <Text style={styles.nomePaciente}>CPF: {paciente.cpf}</Text>
                <Text style={styles.nomePaciente}>Idade: {paciente.idade}</Text>
                <Text style={styles.nomePaciente}>Endereço: {paciente.endereco}</Text>
                <Text style={styles.nomePaciente}>Telefone: {paciente.telefone}</Text>
                <Text style={styles.nomePaciente}>Email: {paciente.email}</Text>
                <Text style={styles.nomePaciente}>Doenças Anteriores: {paciente.doencasAnteriores}</Text>
                <Text style={styles.nomePaciente}>Alergias: {paciente.alergias}</Text>
                <Text style={styles.nomePaciente}>Histórico Médico: {paciente.historicoMedico}</Text>
                <Text style={styles.nomePaciente}>Contato Emergência: {paciente.contatoEmergencia}</Text>
                <Text style={styles.nomePaciente}>É idoso: {paciente.isIdoso ? 'Sim' : 'Não'}</Text>
                <Button title="Remover Paciente" onPress={removerPaciente} />
                <Button title="Fechar" onPress={onClose} />
            </View>
        </Modal>
    );
};

export default ModalInfo;
