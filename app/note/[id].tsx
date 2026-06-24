import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import type { PhotoNote } from "../add";

// Match the Add and Home screens so saved notes are shared across routes.
const NOTES_STORAGE_KEY = "photo-notes";

export default function NoteDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [note, setNote] = useState<PhotoNote | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const screenTitle = note ? `${note.title} Details` : "Details";

    const deleteCurrentNote = async () => {
        // Delete by filtering the persisted array; no separate index is maintained.
        const storedNotesJson = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
        const savedNotes: PhotoNote[] = storedNotesJson
            ? JSON.parse(storedNotesJson)
            : [];
        const updatedNotes = savedNotes.filter((savedNote) => savedNote.id !== id);

        await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(updatedNotes));

        // Return to the existing Home screen when possible to keep navigation natural.
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/");
        }
    };

    const confirmDeleteNote = () => {
        Alert.alert(
            "Delete Note",
            "Are you sure you want to delete this note?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: deleteCurrentNote,
                },
            ]
        );
    };

    useEffect(() => {
        const loadCurrentNote = async () => {
            try {
                // Detail pages are deep-linkable, so load from storage instead of route params.
                const storedNotesJson = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
                const savedNotes: PhotoNote[] = storedNotesJson
                    ? JSON.parse(storedNotesJson)
                    : [];
                const matchingNote = savedNotes.find((savedNote) => savedNote.id === id);

                setNote(matchingNote ?? null);
            } catch {
                setNote(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadCurrentNote();
    }, [id]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Stack.Screen options={{ title: screenTitle }} />
                <Text style={styles.title}>Loading note...</Text>
            </View>
        );
    }

    if (!note) {
        return (
            <View style={styles.container}>
                <Stack.Screen options={{ title: screenTitle }} />
                <View style={styles.notFoundPanel}>
                    <Text style={styles.panelTitle}>Note not found</Text>
                    <Text style={styles.panelText}>
                        The requested note may have been removed or is unavailable.
                    </Text>

                    <Link href="/" asChild>
                        <Pressable style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>Back Home</Text>
                        </Pressable>
                    </Link>
                </View>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: screenTitle }} />
            <Image source={{ uri: note.imageUri }} style={styles.fullImage} />

            <View style={styles.content}>
                <Text style={styles.title}>{note.title}</Text>
                <Text style={styles.date}>
                    {new Date(note.createdAt).toLocaleDateString()}
                </Text>
                <Text style={styles.noteText}>{note.note || "No note text added."}</Text>
            </View>

            <Pressable style={styles.deleteButton} onPress={confirmDeleteNote}>
                <Text style={styles.deleteButtonText}>Delete Note</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        gap: 24,
        padding: 24,
        paddingTop: 72,
        backgroundColor: "#ffffff",
    },
    fullImage: {
        width: "100%",
        minHeight: 420,
        borderRadius: 8,
        backgroundColor: "#e5e5e5",
    },
    content: {
        gap: 10,
    },
    title: {
        color: "#000000",
        fontSize: 34,
        fontWeight: "700",
    },
    date: {
        color: "#525252",
        fontSize: 15,
    },
    noteText: {
        color: "#000000",
        fontSize: 17,
        lineHeight: 25,
    },
    deleteButton: {
        alignItems: "center",
        justifyContent: "center",
        minHeight: 52,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 8,
        backgroundColor: "#ffffff",
    },
    deleteButtonText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "700",
    },
    notFoundPanel: {
        gap: 16,
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
