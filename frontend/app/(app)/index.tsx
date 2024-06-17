import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable, FlatList, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSession } from '../../ctx';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getMedia } from '@/redux/thunks/getMedia';
import { useCameraPermissions } from 'expo-camera';
import { openModal } from '@/redux/slices/modalSlice';
import { Media } from '@/helpers/types';
import { router } from 'expo-router';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { isVideo } from '@/helpers/isVideo';
import { setSelectedMedia } from '@/redux/slices/mediaSlice';

export default function Dashboard() {
    const { signOut, session } = useSession();
    const [permission, requestPermission] = useCameraPermissions();
    const [media, setMedia] = useState<Media[]>([]);
    const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchMedia = async () => {
            setIsLoading(true)
            try {
                const result = await dispatch(getMedia({ session: session ?? '' })).unwrap();
                setMedia(result);

                generateThumbnails(result);
                setIsLoading(false)
            } catch (error) {
                console.error("Failed to fetch media:", error);
                setIsLoading(false)
            }
        };

        fetchMedia();
    }, [dispatch, session]);

    const generateThumbnails = async (mediaItems: Media[]) => {
        const newThumbnails: { [key: string]: string } = {};
        for (const item of mediaItems) {
            if (isVideo(item.url)) {
                try {
                    const { uri } = await VideoThumbnails.getThumbnailAsync(item.url, {
                        time: 1000,
                    });
                    newThumbnails[item._id] = uri;
                } catch (e) {
                    console.warn(`Could not generate thumbnail for ${item.url}`, e);
                }
            }
        }
        setThumbnails(newThumbnails);
    };

    const takePicture = async () => {


        router.navigate('/(app)/capture-screen')
    };





    const handleSelectedMedia = (media: Media) => {
        dispatch(setSelectedMedia(media));
        router.replace('/(app)/media-screen');
    };


    const handleSignOut = () => {

        signOut();
        router.replace('/')
    }

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center' }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </SafeAreaView>
        );
    }


    if (isLoading) {
        return (<SafeAreaView style={styles.loadingContainer}>
            <ActivityIndicator size='large' color={'white'} />
        </SafeAreaView>)
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                        <Text style={styles.signOutButtonText}>Sign Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.buttonText}>Capture Media</Text>
                    </TouchableOpacity>

                </View>

                {media.length === 0 ? <View style={styles.noMediaContainer}>
                    <View style={styles.mediaContainer}>
                        <Text style={styles.noMediaText}>No media available</Text>
                    </View>
                </View> : <View style={styles.mediaContainer}>
                    <FlatList
                        data={media}
                        keyExtractor={(item) => item._id}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <Pressable style={styles.mediaButton} onPress={() => handleSelectedMedia(item)}>
                                {isVideo(item.url) ? (
                                    <Image source={{ uri: thumbnails[item._id] }} style={styles.media} />
                                ) : (
                                    <Image source={{ uri: item.url }} style={styles.media} />
                                )}
                            </Pressable>
                        )}
                    />
                </View>}



            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f8f8f8',
    },
    signOutButton: {
        backgroundColor: '#ff4d4d',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        marginTop: 10
    },
    signOutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#1e90ff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,

        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    mediaContainer: {
        flex: 1,
    },
    media: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    mediaButton: {
        flex: 1,
        margin: 5,
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: '#000',
    },
    noMediaContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noMediaText: {
        fontSize: 18,
        color: '#333',
    }
});
