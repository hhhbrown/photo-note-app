import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerTintColor: "#000000",
            }}
        >
            <Stack.Screen name="index" options={{ title: "Photo Note App" }} />
            <Stack.Screen name="add" options={{ title: "New Note" }} />
            <Stack.Screen name="note/[id]" options={{ title: "Details" }} />
        </Stack>
    );
}
