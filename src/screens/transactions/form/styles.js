import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    content: {
        padding: 5
    }, 
    input:{
        marginBottom: 5,
        fontFamily: 'ProductSans-Regular' 
    },
    button:{
        bottom: 0,
        justifyContent: "center",
        backgroundColor: '#4cb54c',
        height: 60
        
    },
    error: {
        color: '#f54242',
        paddingHorizontal: 14
    },
    text:{
        fontSize: 18
    }
})

export default styles;