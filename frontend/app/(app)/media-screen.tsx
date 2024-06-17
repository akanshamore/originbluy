import { DeleteModal } from "@/components/ImageModal";
import { useSession } from "@/ctx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearSelectedMedia } from "@/redux/slices/mediaSlice"; import { deleteMedia } from "@/redux/thunks/deleteMedia";
;
import { router } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { WebView } from 'react-native-webview';

export default function MediaScreen() {

    const [isDeleting, setIsDeleting] = useState(false)
    const dispatch = useAppDispatch()
    const media = useAppSelector((state) => state.media);

    const { session } = useSession()

    const handleGoBack = () => {
        dispatch(clearSelectedMedia())
        router.replace('/(app)')
    };

    const handleDelete = () => {
        setIsDeleting(true)

    };

    const handleDeleteConfirmation = async () => {
        await dispatch(deleteMedia({ id: media._id, session: session ?? '' }))
        router.push('/(app)')

    };

    if (!media.url) {
        return (
            <View style={styles.centeredView}>
                <Text>No URL provided</Text>
            </View>
        );
    }


    return (
        <>
            <View style={styles.container}  >
                <WebView
                    style={styles.centeredView}
                    source={{ uri: media.url }}
                />
                <View style={styles.buttonContainer}>
                    <Pressable style={[styles.button, styles.buttonClose]} onPress={handleGoBack}>
                        <Text style={styles.textStyle}>Go Back</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonDelete]} onPress={handleDelete}>
                        <Text style={styles.textStyle}>Delete</Text>
                    </Pressable>
                </View>
            </View>

            {isDeleting && <DeleteModal close={() => setIsDeleting(false)} handleDeleteConfirmation={handleDeleteConfirmation} />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    webView: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        flex: 1,
        marginHorizontal: 10,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    buttonDelete: {
        backgroundColor: '#FF0000',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});