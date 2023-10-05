
import { StyleSheet } from "react-native"

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent:'center',
        height: 600,
        marginBottom: 50,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center', 
        alignSelf: 'center'
    },
    subtitle: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center', 
        alignSelf: 'center'
    },
    label: {
        marginTop: 25,
        color: 'white',
        fontWeight: 'bold',
    },
    // inputField: {
    //     color:'white',
    //     fontSize: 20,
    // },
    inputField: {
        color: 'white',
        fontSize: 20,
        borderWidth: 0,  // Grosor del borde
        borderColor: 'rgba(255, 255, 255, 0.2)',  // Color del borde (un poco más claro que el fondo)
        borderRadius: 10,  // Bordes redondeados
        height: 40,  // Altura del campo de entrada
        paddingHorizontal: 10,  // Espaciado horizontal dentro del campo de entrada
        marginTop: 10,  // Espaciado superior
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    inputFieldIOS: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        paddingBottom: 4,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    button: {
        backgroundColor:'#5566ff',
        borderWidth: 2,
        borderColor: '#5566ff',
        paddingHorizontal: 100,
        paddingVertical: 14,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    newUserContainer: {
        flexDirection:'row',
        alignItems: 'center',
        marginTop: 10,
        
    },
    newUserTextContainer: {
        backgroundColor:'#5566ff',
        borderWidth: 2,
        borderColor: '#5566ff',
        // paddingHorizontal: 20,
        // paddingVertical: 5,
        width:100,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        // borderRadius: 100,
        marginLeft:50,
    },

    buttonReturn: {
        position: 'absolute',
        top: 50,
        left: 20,
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100
    },
    resetButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Coloca el botón en el extremo derecho
        marginTop: 10,
        alignItems: 'center', // Alinea verticalmente los elementos en el centro
    },
    resetButton: {
        backgroundColor: 'transparent', // Fondo transparente
        borderWidth: 0, // Sin borde
    },
    resetButtonText: {
        color: 'rgba(255,255,255,0.4)', // Color similar al texto "Ingrese credenciales"
        fontSize: 16, // Tamaño de fuente más pequeño
    },
    createAccountText: {
        color: 'white',
        fontSize: 16,
        marginTop: 20, // Espaciado desde el botón "Login"
        textAlign: 'center', // Centra el texto horizontalmente
    },
    signUpButton: {
        backgroundColor: '#800080', // Color morado
        paddingHorizontal: 20,
        paddingVertical: 10,
       
    },
    signUpButtonText: {
        color: '#5566ff',
        fontSize: 18,
        textAlign: 'center', // Centra el texto horizontalmente
        marginTop: 10, // Espaciado desde el texto "Quieres crear una nueva cuenta?"
    },
});