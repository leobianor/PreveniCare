import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from '../style.js';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';

export default function Menu({ navigation }) {
    const { username } = useContext(AuthContext)
    return (
        <View style={styles.containerBetween}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.text}>Olá,</Text>
                    <Text style={styles.title}>{username}</Text>
                </View>
                <Ionicons name="md-exit-outline" size={24} color="#121A2C" onPress={() => navigation.navigate('Home')}/>
            </View>

            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonMenu} onPress={() => navigation.navigate('CadastroPacientes')}>
                    <Text style={styles.buttonText}>Cadastro de Pacientes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonMenu} onPress={() => navigation.navigate('CadastroMedicamentos')}>
                    <Text style={styles.buttonText}>Cadastro de Medicamentos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonMenu} onPress={() => navigation.navigate('Acompanhamento')}>
                    <Text style={styles.buttonText}>Acompanhamento</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}