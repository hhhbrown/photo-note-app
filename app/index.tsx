import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photo Note App</Text>
        <Text style={styles.subtitle}>Saved photo notes will appear here.</Text>
      </View>

      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No saved notes yet</Text>
        <Text style={styles.emptyText}>
          Add your first photo note to keep a picture and a quick thought
          together.
        </Text>
      </View>

      <Link href="/add" asChild>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Add Note</Text>
        </Pressable>
      </Link>

      {/* Temporary sample note until saved notes are loaded from local storage. */}
      <Link href="/note/sample-1" style={styles.sampleNote}>
        <Text style={styles.sampleTitle}>Sample photo note</Text>
        <Text style={styles.sampleMeta}>Tap to open /note/sample-1</Text>
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
  sampleNote: {
    gap: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  sampleTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  sampleMeta: {
    color: "#525252",
    fontSize: 14,
  },
});
