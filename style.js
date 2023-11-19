import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '##F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerPage:{
        flex: 1,
        padding:20,
        paddingTop:50,
        backgroundColor: '#F5F5F5',
        color: '#121212'

    },
    containerPaciente:{
        padding:20,
        paddingTop:20,
        gap: 10
    },
    inputForm: {
        fontSize: 20,
        color: '#121212',
    },
    containerBetween: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal:20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#121212'
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "500",
        color: '#121212',
        marginVertical: 10,
    },
    textMedicamento:{
        fontSize: 16,
        color: '#121212',
    },
    buttonAplicar: {
        flex: 1,
        alignSelf: 'flex-start',
        backgroundColor: '#4682B4',
        borderRadius: 8,
        paddingVertical:6,
        paddingHorizontal: 16,
        marginTop: 6
    },
    buttonRemover: {
        flex: 1,
        alignSelf: 'flex-start',
        backgroundColor: '#FF0000',
        borderRadius: 8,
        paddingVertical:6,
        paddingHorizontal: 16,
        marginTop: 6

    },
    titleScreen: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#121212',
        paddingTop: 4,
        paddingLeft: 20
    },
    textBlack: {
        color: '#121212'
    },
    textWite: {
        color: '#FFF',
        textAlign: 'center'
    },
    nomePaciente: {
        fontSize: 18,
        color: '#121212',
        textAlign: 'justify'
    },
    input: {
        width:250,
        padding: 8,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 4,
        color: '#121212',
        textAlign: 'center'
    },
    buttonMenu: {
        backgroundColor: '#121A2C',
        color: '#121212',
        paddingVertical: 20,
        width: 300,
        borderRadius: 8,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#121A2C',
        color: '#FFFFFF',
        padding: 8,
        paddingHorizontal: 48,
        borderRadius: 40,
        marginTop: 20,
    },
    buttonForm: {
        backgroundColor: '#121A2C',
        borderRadius: 6,
        padding: 8,
        textAlign: 'center',
        paddingHorizontal: 48,
        marginTop: 20,
        marginBottom: -20
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imagem: {
        width: 200,
        height: 200,
        padding: 20
    },
    box: {
        borderColor: '#121A2C',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
    },
    DateTime:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    erro: {
        paddingTop:10,
        color: 'red'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    pacienteButton: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    textNull: {
        color: '#bbb',
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10
    },
    filtroTexto:{
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
    },
    buttonFiltro: {
        alignSelf: 'flex-start',
        backgroundColor: '#000',
        borderRadius: 8,
        paddingVertical:6,
        paddingHorizontal: 16,
        marginTop: 6
    },
    containerAcompanhamento:{
        paddingHorizontal:20,
    }
    
});