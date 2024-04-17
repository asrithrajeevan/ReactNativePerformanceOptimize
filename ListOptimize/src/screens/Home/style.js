import React from "react";
import { StyleSheet, Platform } from "react-native";

const styles = (height, width, portrait) => StyleSheet.create({
    container:{
        marginHorizontal:15, 
        paddingTop:20
    },
    flatlistContainer:{ 
        padding: 15, 
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc' 
    },
    flatlistTouchable:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },
})

export default styles