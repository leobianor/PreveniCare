import React from 'react';
import { View, Text, Modal, Button } from 'react-native';

const ModalInfo = ({ visible, paciente, onClose }) => {
    if (!paciente) {
        return null;
    }

    return (
        <Modal animationType="slide" transparent={false} visible={visible}>
            <View>
                <Text>Informações do Paciente:</Text>
                <Text>Nome: {paciente.nome} {paciente.sobrenome}</Text>
                <Text>CPF: {paciente.cpf}</Text>
                <Text>Idade: {paciente.idade}</Text>
                <Text>Endereço: {paciente.endereco}</Text>
                <Text>Telefone: {paciente.telefone}</Text>
                <Text>Email: {paciente.email}</Text>
                <Text>Doenças Anteriores: {paciente.doencasAnteriores}</Text>
                <Text>Alergias: {paciente.alergias}</Text>
                <Text>Histórico Médico: {paciente.historicoMedico}</Text>
                <Text>Contato Emergência: {paciente.contatoEmergencia}</Text>
                <Text>É idoso: {paciente.isIdoso ? 'Sim' : 'Não'}</Text>
                <Button title="Fechar" onPress={onClose} />
            </View>
        </Modal>
    );
};

export default ModalInfo;
