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
    pedidos: {
        width: '100%',
    },
    pedidoData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pedidoDataTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
    },
    cardProduto: {
        borderColor: '#121A2C55',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        marginVertical: 5,
    },
    produtoData: {
        flex: 1,
        alignSelf: 'flex-start',
    },
    thumb: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    price: {
        color: '#29A035',
        fontSize: 18,
    },
    spinner: {
        flexDirection: 'row',
        backgroundColor: '#D9D9D9',
        borderRadius: 999,
    },
    spinnerMinus: {
        textAlign: 'center',
        backgroundColor: '#E9E9E9',
        borderRadius: 999,
        width: 24,
        height: 24,
        lineHeight: 24,
        fontWeight: 'bold',
    },
    spinnerPlus: {
        textAlign: 'center',
        backgroundColor: '#121A2C',
        borderRadius: 999,
        width: 24,
        height: 24,
        fontWeight: 'bold',
        lineHeight: 24,
        color: '#FFF',
    },
    spinnerValue: {
        textAlign: 'center',
        width: 24,
        height: 24,
        lineHeight: 24,
    },
    scroll: {
        width: '100%',
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
});