import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { CameraView, type CameraCapturedPicture, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const NOTES_STORAGE_KEY = "photo-notes";

export type PhotoNote = {
    id: string;
    title: string;
    note: string;
    imageUri: string;
    createdAt: string;
};

export default function AddNoteScreen() {
    const router = useRouter();
    const cameraRef = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [isTakingPhoto, setIsTakingPhoto] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");

    const takePhoto = async () => {
        if (!cameraRef.current || isTakingPhoto) {
            return;
        }

        setIsTakingPhoto(true);

        try {
            const capturedPhoto = await cameraRef.current.takePictureAsync();
            setPhoto(capturedPhoto);
            setValidationMessage("");
        } finally {
            setIsTakingPhoto(false);
        }
    };

    const saveNote = async () => {
        const trimmedTitle = title.trim();

        if (!photo) {
            setValidationMessage("Take a photo before saving this note.");
            return;
        }

        if (!trimmedTitle) {
            setValidationMessage("Add a title before saving this note.");
            return;
        }

        setIsSaving(true);
        setValidationMessage("");

        try {
            const savedNotesJson = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
            const savedNotes: PhotoNote[] = savedNotesJson
                ? JSON.parse(savedNotesJson)
                : [];

            const newNote: PhotoNote = {
                id: Date.now().toString(),
                title: trimmedTitle,
                note: note.trim(),
                imageUri: photo.uri,
                createdAt: new Date().toISOString(),
            };

            await AsyncStorage.setItem(
                NOTES_STORAGE_KEY,
                JSON.stringify([...savedNotes, newNote])
            );

            router.replace("/");
        } catch {
            setValidationMessage("Something went wrong while saving. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const showPermissionMessage = !permission || !permission.granted;

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Add Note</Text>
                    <Text style={styles.subtitle}>
                        Take a photo, add a title, and save it locally.
                    </Text>
                </View>

                {showPermissionMessage ? (
                    <View style={styles.panel}>
                        <Text style={styles.panelTitle}>Camera permission needed</Text>
                        <Text style={styles.panelText}>
                            Photo Note App needs camera access before you can take a
                            photo. If permission was denied, allow camera access in your
                            device settings and try again.
                        </Text>

                        <Pressable
                            style={styles.primaryButton}
                            onPress={requestPermission}
                        >
                            <Text style={styles.primaryButtonText}>Allow Camera</Text>
                        </Pressable>
                    </View>
                ) : photo ? (
                    <View style={styles.previewSection}>
                        <Image source={{ uri: photo.uri }} style={styles.photoPreview} />

                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="Title"
                                placeholderTextColor="#737373"
                                value={title}
                                onChangeText={(text) => {
                                    setTitle(text);
                                    setValidationMessage("");
                                }}
                            />

                            <TextInput
                                style={[styles.input, styles.noteInput]}
                                multiline
                                placeholder="Note"
                                placeholderTextColor="#737373"
                                textAlignVertical="top"
                                value={note}
                                onChangeText={setNote}
                            />
                        </View>

                        {validationMessage ? (
                            <Text style={styles.validationMessage}>
                                {validationMessage}
                            </Text>
                        ) : null}

                        <Pressable
                            style={[
                                styles.primaryButton,
                                isSaving && styles.disabledButton,
                            ]}
                            onPress={saveNote}
                            disabled={isSaving}
                        >
                            <Text style={styles.primaryButtonText}>
                                {isSaving ? "Saving..." : "Save Note"}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.secondaryButton}
                            onPress={() => setPhoto(null)}
                        >
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    container: {
        flexGrow: 1,
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
        gap: 16,
    },
    camera: {
        minHeight: 420,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 8,
        backgroundColor: "#000000",
    },
    previewSection: {
        gap: 16,
    },
    photoPreview: {
        width: "100%",
        minHeight: 260,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 8,
        backgroundColor: "#fafafa",
    },
    form: {
        gap: 12,
    },
    input: {
        minHeight: 52,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 8,
        color: "#000000",
        fontSize: 16,
        backgroundColor: "#ffffff",
    },
    noteInput: {
        minHeight: 120,
    },
    validationMessage: {
        color: "#000000",
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 20,
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
