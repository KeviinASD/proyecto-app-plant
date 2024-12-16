
import PhotoPreview from '@/components/PhotoPreview';
import { usePhoto } from '@/src/context/photoContext';
import { AntDesign } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Camera() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    //const [flash, setFlash] = useState();
    const [photo, setPhoto] = useState<CameraCapturedPicture | null | undefined>(null);
    const cameraRef = useRef<CameraView | null>(null);
    const {setCurrentPhoto} = usePhoto();
    //context
  
    if (!permission) {
      // Camera permissions are still loading.
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet.
      return (
        <View style={styles.container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
  
    function toggleCameraFacing() {
      setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const config = {
                quality: 1,
                base64: true,
                exif: false
            }
            const takedPhoto = await cameraRef.current.takePictureAsync(config)
            setPhoto(takedPhoto)
        }
    }

    const handleRetakePhoto = () => setPhoto(null)

    if (photo) {
        return (
            <PhotoPreview photo={photo} handleRetakePhoto={handleRetakePhoto}/>
        )
    }
  
    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing}
            ref={cameraRef}
        >

          <View style={{flex: 1, marginHorizontal: 15, marginVertical: 25}}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <AntDesign name="retweet" size={24} color="white" style={styles.icon}/>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
    
            <TouchableOpacity style={styles.buttonPress} onPress={handleTakePhoto}>
              <AntDesign name="camera" size={24} color="white" style={{backgroundColor: 'white', padding: 20, borderRadius: 20}}/>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      marginHorizontal: 10,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    icon: {
        padding: 15,
    },
    buttonPress: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginHorizontal: 10,
    },
});