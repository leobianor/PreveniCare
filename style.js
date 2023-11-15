import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerBetween: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    text: {
        color: '#FFFFFF'
    },
    input: {
        padding: 8,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 4,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    buttonMenu: {
        backgroundColor: '#121A2C',
        color: '#FFFFFF',
        padding: 20,
        paddingHorizontal: 48,
        borderRadius: 8,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#121A2C',
        color: '#FFFFFF',
        padding: 8,
        paddingHorizontal: 48,
        borderRadius: 4,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
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