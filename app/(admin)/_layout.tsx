import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { View, ActivityIndicator } from "react-native";

export default function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        setLoading(false);
        return;
      }

      const { data: admin } = await supabase
        .from("admins")
        .select("id")
        .eq("id", data.user.id)
        .single();

      setIsAdmin(!!admin);
      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack>
      {!isAdmin ? (
        <Stack.Screen name="login" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
