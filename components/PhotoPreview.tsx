import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Ionicons, Fontisto, FontAwesome5 } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { CameraCapturedPicture } from 'expo-camera'
import { uriToBlob } from '@/utils/helpers';
import { PredictionTypes } from '@/src/interface/predictions';
import { hp, wp } from '@/src/helper/common';
import { usePhoto } from '@/src/context/photoContext';


export default function PhotoPreview({
    photo,
    handleRetakePhoto,
} : {
    photo: CameraCapturedPicture,
    handleRetakePhoto: () => void,
}) {
  
  const [prediction, setPrediction] = useState<PredictionTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setCurrentPhoto, setCurrentPrediction } = usePhoto();
  
  useEffect(() => {
    setCurrentPhoto(photo);
  }, [])

  const handleProcessImage = async () => {
    setLoading(true);

    const response = await fetch(photo.uri);
    const blob = await response.blob();

    

    const photoData = {
        uri: photo.uri, // Ruta URI de la imagen capturada
        name: 'photo.jpg', // Nombre del archivo
        type: 'image/jpeg', // Tipo MIME (debe coincidir con el formato de la imagen)
    } as any;

    // Crear FormData y adjuntar la imagen
    const formData = new FormData();
    formData.append('image', photoData); // 'image' debe coincidir con el nombre esperado en el backend


    try {

        const response = await fetch('https://model-plant-backend.onrender.com/api/predict/', {
            method: 'POST',
            body: formData
        })

        const result = await response.json();
        console.log(result);
        if (response.ok) {
            
            
            setPrediction(result);
            setCurrentPrediction(result);
        } else {
            Alert.alert('Error', 'No se pudo procesar la imagen');
        }
    } catch (error: any) {
        Alert.alert('Error', 'No se puede concetar al Backend');
        console.log(error)
    } finally {
        setLoading(false);
    }

  }
  

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <Image 
                style={styles.previewContainer}
                source={{ uri: photo.uri }}
            />
            <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
                <FontAwesome5 name="arrow-left" size={30} color="white" style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.procesar} onPress={handleProcessImage}>
                <Text style={{fontSize: 18, color: 'white'}}>Procesar Imagen</Text>
            </TouchableOpacity>
            <View style={{position: 'absolute', top: hp(10), flex: 1, flexDirection: 'row', alignSelf: 'center',}}>
                <Text style={{fontSize: 20, color: 'white', textAlign: 'center', fontWeight: 700}}> {prediction?.prediction}</Text>
            </View>


            {
                loading && (
                    <View style={{position: 'absolute', top: hp(50), left: wp(40), flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}> Procesando...</Text>
                    </View>
                )
            }
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        flex: 1,
    },
    previewContainer: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        top: hp(5),
        left: wp(5),
    },
    icon: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.2),
        borderRadius: 5,
        borderWidth: 2,
    },
    procesar: {
        position: 'absolute', 
        bottom: 20, 
        flex: 1, 
        flexDirection: 'row', 
        alignSelf: 'center',
        borderWidth: 2,
        paddingHorizontal: wp(10),
        paddingVertical: hp(1.5),
        borderRadius: 5,
        
    }
})