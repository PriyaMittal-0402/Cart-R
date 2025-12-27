import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password required");
      return;
    }

    setLoading(true);

    // 1️⃣ AUTH LOGIN
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Login failed", error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    // 2️⃣ VERIFY ADMIN TABLE
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("id")
      .eq("id", user.id)
      .single();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      Alert.alert("Access denied", "You are not an admin");
      setLoading(false);
      return;
    }

    // 3️⃣ SUCCESS → DASHBOARD
    router.replace("/(admin)/dashboard");
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <Text className="text-3xl font-JakartaBold text-center mb-2">
        Admin Portal
      </Text>
      <Text className="text-gray-400 text-center mb-8">
        Authorized personnel only
      </Text>

      <TextInput
        placeholder="Admin email"
        autoCapitalize="none"
        className="border rounded-xl px-4 py-3 mb-4"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border rounded-xl px-4 py-3 mb-6"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className="bg-black py-4 rounded-xl"
      >
        <Text className="text-white text-center font-JakartaBold">
          {loading ? "Verifying..." : "Login"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AdminLogin;
