import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AddNoteScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Add Note</Text>
                <Text style={styles.subtitle}>
                    Camera capture, photo preview, and note details will be added here
                    later.
                </Text>
            </View>

            {/* Placeholder content keeps the route useful while camera features are built. */}
            <View style={styles.placeholder}>
                <Text style={styles.placeholderTitle}>Camera flow coming soon</Text>
                <Text style={styles.placeholderText}>
                    This screen will guide you through taking a photo, reviewing it, and
                    saving it with a title and note.
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
    placeholder: {
        gap: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 8,
        backgroundColor: "#fafafa",
    },
    placeholderTitle: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "600",
    },
    placeholderText: {
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
