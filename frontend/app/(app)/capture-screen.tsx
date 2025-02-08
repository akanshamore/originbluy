import { CameraType, CameraView, useCameraPermissions, Camera } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Video } from 'expo-av';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useSession } from '@/ctx';
import { saveMedia } from '@/redux/thunks/saveMedia';
import { CapturedMediaType } from '@/helpers/types';
import { router } from 'expo-router';

export default function App() {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraType | undefined>(undefined);

    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedMedia, setCapturedMedia] = useState<CapturedMediaType | null>(null);
    const [isRecording, setIsRecording] = useState(false);


    const dispatch = useAppDispatch()
    const { session } = useSession()

    const videoRef = useRef(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }


    const takePicture = async () => {
        if (!cameraRef.current) return;

        const photo = await cameraRef.current.takePictureAsync({
            quality: 0.7,

        });



        setPreviewVisible(true);
        setCapturedMedia({ type: 'photo', data: photo });
    };

    const startRecording = async () => {
        if (!cameraRef.current) return;

        setIsRecording(true); // Set recording state to true

        const videoRecordPromise = cameraRef.current.recordAsync();

        if (videoRecordPromise) {

            const videoData = await videoRecordPromise;

            setPreviewVisible(true);
            setCapturedMedia({ type: 'video', data: videoData });
            setIsRecording(false)
        }
    };

    const stopRecording = () => {
        if (cameraRef.current) {
            cameraRef.current.stopRecording();
            setIsRecording(false); // Set recording state to false after stopping
        }
    };

    const discardMedia = () => {
        setPreviewVisible(false);
        setCapturedMedia(null);
    };




    const storeMedia = async () => {

        await dispatch(saveMedia({ capturedMedia, session: session ?? '' }))
        setPreviewVisible(false);
        setCapturedMedia(null);
        router.push('/(app)')

    };



    const goBack = () => {

        router.back()
    }


    if (previewVisible && capturedMedia) {
        return (
            <View style={styles.previewContainer}>
                {capturedMedia.type === 'photo' ? (
                    <View style={styles.mediaContainer}>
                        <Image source={{ uri: capturedMedia.data.uri }} style={styles.previewImage} />
                    </View>
                ) : (
                    <View style={styles.mediaContainer}>
                        <Video
                            ref={videoRef}
                            style={styles.previewVideo}
                            source={{ uri: capturedMedia.data.uri }}
                            useNativeControls
                            resizeMode=''
                            shouldPlay
                        />
                    </View>
                )}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={discardMedia}>
                        <Text style={styles.text}>Discard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={storeMedia}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} mode='video'>
                <View style={styles.topButtonContainer}>
                    <TouchableOpacity style={styles.button} onPress={goBack}>
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: isRecording ? 'red' : '#1e90ff' }]}
                        onPress={isRecording ? stopRecording : startRecording}>
                        <Text style={styles.text}>{isRecording ? 'Stop Recording' : 'Record Video'}</Text>
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
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    topButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        top: 20,
        width: '100%',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    button: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#1e90ff',
        width: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 11,
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    mediaContainer: {
        width: '100%',
        height: '80%',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    previewVideo: {
        width: '100%',
        height: '100%',
    },
});