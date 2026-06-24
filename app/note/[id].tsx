import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Note Detail</Text>
        <Text style={styles.subtitle}>
          This screen will show the saved photo note details later.
        </Text>
      </View>

      {/* Route param display confirms the dynamic note route is wired correctly. */}
      <View style={styles.noteCard}>
        <Text style={styles.label}>Note ID</Text>
        <Text style={styles.noteId}>{id}</Text>
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
  noteCard: {
    gap: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  label: {
    color: "#525252",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  noteId: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "700",
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
