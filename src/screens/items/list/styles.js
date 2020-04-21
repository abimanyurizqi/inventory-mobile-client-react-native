import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    image: {
        height: 140,
        resizeMode: "cover",
        justifyContent: "center"
    },
    item:{
        backgroundColor: '#fff'
    },
    deleteButton: {
        alignSelf: 'flex-end',
        width: 75,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ad3131',
        marginVertical: 3,
      }
});

export default styles
