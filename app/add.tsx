import { Link } from "expo-router";
import { CameraView, type CameraCapturedPicture, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function AddNoteScreen() {
    const cameraRef = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
    const [isTakingPhoto, setIsTakingPhoto] = useState(false);

    const takePhoto = async () => {
        if (!cameraRef.current || isTakingPhoto) {
            return;
        }

        setIsTakingPhoto(true);

        try {
            const capturedPhoto = await cameraRef.current.takePictureAsync();
            setPhoto(capturedPhoto);
        } finally {
            setIsTakingPhoto(false);
        }
    };

    const showPermissionMessage = !permission || !permission.granted;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Add Note</Text>
                <Text style={styles.subtitle}>
                    Take a photo now. Saving note details will come later.
                </Text>
            </View>

            {showPermissionMessage ? (
                <View style={styles.panel}>
                    <Text style={styles.panelTitle}>Camera permission needed</Text>
                    <Text style={styles.panelText}>
                        Photo Note App needs camera access before you can take a photo.
                        If permission was denied, allow camera access in your device
                        settings and try again.
                    </Text>

                    <Pressable style={styles.primaryButton} onPress={requestPermission}>
                        <Text style={styles.primaryButtonText}>Allow Camera</Text>
                    </Pressable>
                </View>
            ) : photo ? (
                <View style={styles.previewSection}>
                    <Image source={{ uri: photo.uri }} style={styles.photoPreview} />

                    <Pressable style={styles.secondaryButton} onPress={() => setPhoto(null)}>
                        <Text style={styles.secondaryButtonText}>Retake</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.cameraSection}>
                    {/* Keep the camera mounted only while actively taking a photo. */}
                    <CameraView ref={cameraRef} style={styles.camera} facing="back" />

                    <Pressable
                        style={[
                            styles.primaryButton,
                            isTakingPhoto && styles.disabledButton,
                        ]}
                        onPress={takePhoto}
                        disabled={isTakingPhoto}
                    >
                        <Text style={styles.primaryButtonText}>
                            {isTakingPhoto ? "Taking Photo..." : "Take Photo"}
                        </Text>
                    </Pressable>
                </View>
            )}

            <Link href="/" asChild>
                <Pressable style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Back Home</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
        padding: 24,
        paddingTop: 72,
        backgroundColor: "#ffffff",
    },
    header: {
        gap: 8,
    },
    title: {
        color: "#000000",
        fontSize: 34,
        fontWeight: "700",
    },
    subtitle: {
        color: "#404040",
        fontSize: 16,
        lineHeight: 22,
    },
    panel: {
        gap: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 8,
        backgroundColor: "#fafafa",
    },
    panelTitle: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "600",
    },
    panelText: {
        color: "#525252",
        fontSize: 15,
        lineHeight: 22,
    },
    cameraSection: {
        flex: 1,
        gap: 16,
    },
    camera: {
        flex: 1,
        minHeight: 420,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 8,
        backgroundColor: "#000000",
    },
    previewSection: {
        flex: 1,
        gap: 16,
    },
    photoPreview: {
        flex: 1,
        width: "100%",
        minHeight: 420,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 8,
        backgroundColor: "#fafafa",
    },
    primaryButton: {
        alignItems: "center",
        justifyContent: "center",
        minHeight: 52,
        borderRadius: 8,
        backgroundColor: "#000000",
    },
    primaryButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700",
    },
    disabledButton: {
        backgroundColor: "#525252",
    },
    secondaryButton: {
        alignItems: "center",
        justifyContent: "center",
        minHeight: 52,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 8,
        backgroundColor: "#ffffff",
    },
    secondaryButtonText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "700",
    },
});
