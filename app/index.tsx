import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import type { PhotoNote } from "./add";

const NOTES_STORAGE_KEY = "photo-notes";

export default function HomeScreen() {
    const router = useRouter();
    const [notes, setNotes] = useState<PhotoNote[]>([]);
    const [loadError, setLoadError] = useState("");

    useFocusEffect(
        useCallback(() => {
            const loadSavedNotes = async () => {
                try {
                    // Home reloads on focus so returning from add/delete shows current storage.
                    const storedNotesJson = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
                    const savedNotes: PhotoNote[] = storedNotesJson
                        ? JSON.parse(storedNotesJson)
                        : [];

                    setNotes(savedNotes);
                    setLoadError("");
                } catch {
                    setLoadError("Saved notes could not be loaded.");
                }
            };

            loadSavedNotes();
        }, [])
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Photo Note App</Text>
            </View>

            <Link href="/add" asChild>
                <Pressable style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Add Note</Text>
                </Pressable>
            </Link>

            {loadError ? <Text style={styles.errorText}>{loadError}</Text> : null}

            {notes.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>No saved notes yet</Text>
                    <Text style={styles.emptyText}>
                        Add your first photo note to keep a picture and a quick thought
                        together.
                    </Text>
                </View>
            ) : (
                <View style={styles.notesList}>
                    {notes.map((note) => (
                        <Pressable
                            key={note.id}
                            style={styles.noteCard}
                            onPress={() => router.push(`/note/${note.id}`)}
                        >
                            <Image
                                source={{ uri: note.imageUri }}
                                style={styles.noteImage}
                            />

                            <View style={styles.noteContent}>
                                <Text style={styles.noteTitle}>{note.title}</Text>
                                <Text style={styles.noteDate}>
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            )}
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
    header: {
        gap: 8,
    },
    title: {
        color: "#000000",
        fontSize: 34,
        fontWeight: "700",
    },
    emptyState: {
        gap: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 8,
        backgroundColor: "#ffffff",
    },
    emptyTitle: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "600",
    },
    emptyText: {
        color: "#525252",
        fontSize: 15,
        lineHeight: 22,
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
    errorText: {
        color: "#000000",
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 20,
    },
    notesList: {
        gap: 12,
    },
    noteCard: {
        flexDirection: "row",
        gap: 14,
        alignItems: "center",
        padding: 16,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 8,
        backgroundColor: "#fafafa",
    },
    noteImage: {
        width: 72,
        height: 72,
        borderRadius: 8,
        backgroundColor: "#e5e5e5",
    },
    noteContent: {
        flex: 1,
        gap: 6,
    },
    noteTitle: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "600",
    },
    noteDate: {
        color: "#525252",
        fontSize: 14,
    },
});
