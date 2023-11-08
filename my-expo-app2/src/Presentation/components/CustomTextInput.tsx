import React from 'react'
import { TextInput, View, Image,StyleSheet, KeyboardType} from 'react-native'


        interface Props{
                image:any,
                placeholder:string,
                value:string,
                keyboardType:KeyboardType,
                secureTextEntry?:boolean,
                property:string,
                onChangeText:(property:string, values:any)=> void
        }

        export const CustomTextInput = ({

            image,
            placeholder,
            value,
            keyboardType,
            secureTextEntry=false,
            property,
            onChangeText,


            }:Props) => {

        return (
            <View style={styles.formInput}>
            <Image
                style={styles.formIcons}
                source={image}
                />
            <TextInput
                style={styles.formTexInput}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={value}
                onChangeText= {Text=>onChangeText(property , Text)}
                secureTextEntry={secureTextEntry}
                />
        </View>

        )
        }


const styles = StyleSheet.create({
    formInput:{
        flexDirection:"row",
        marginTop:30,
      },
      
      formIcons:{
        width:25,
        height:25,
        marginTop:5
      },
      formTexInput:{
        flex:1,
        borderBottomWidth:1,
        borderBottomColor:'#AAAAAA',
        marginLeft:15
      }
    
})