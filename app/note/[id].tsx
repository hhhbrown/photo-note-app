import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import type { PhotoNote } from "../add";

const NOTES_STORAGE_KEY = "photo-notes";

export default function NoteDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [note, setNote] = useState<PhotoNote | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadNote = async () => {
            try {
                const savedNotesJson = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
                const savedNotes: PhotoNote[] = savedNotesJson
                    ? JSON.parse(savedNotesJson)
                    : [];
                const matchingNote = savedNotes.find((savedNote) => savedNote.id === id);

                setNote(matchingNote ?? null);
            } catch {
                setNote(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadNote();
    }, [id]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading note...</Text>
            </View>
        );
    }

    if (!note) {
        return (
            <View style={styles.container}>
                <View style={styles.panel}>
                    <Text style={styles.panelTitle}>Note not found</Text>
                    <Text style={styles.panelText}>
                        This note may have been removed or could not be loaded.
                    </Text>
                </View>

                <Link href="/" asChild>
                    <Pressable style={styles.secondaryButton}>
                        <Text style={styles.secondaryButtonText}>Back Home</Text>
                    </Pressable>
                </Link>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: note.imageUri }} style={styles.fullImage} />

            <View style={styles.content}>
                <Text style={styles.title}>{note.title}</Text>
                <Text style={styles.date}>
                    {new Date(note.createdAt).toLocaleDateString()}
                </Text>
                <Text style={styles.noteText}>{note.note || "No note text added."}</Text>
            </View>

            <Link href="/" asChild>
                <Pressable style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Back Home</Text>
                </Pressable>
            </Link>
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
