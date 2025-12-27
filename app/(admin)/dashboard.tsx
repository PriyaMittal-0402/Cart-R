import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* TOP BAR */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-white shadow">
        <Text className="text-2xl font-JakartaBold text-black">
          Cartr Admin
        </Text>

        <TouchableOpacity onPress={signOut}>
          <Text className="text-red-500 font-JakartaSemiBold">
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* STATS */}
        <View className="flex-row flex-wrap gap-6">
          <View className="bg-white w-[280px] p-6 rounded-xl shadow">
            <Text className="text-gray-500 mb-2">Total Users</Text>
            <Text className="text-3xl font-JakartaBold">1,234</Text>
          </View>

          <View className="bg-white w-[280px] p-6 rounded-xl shadow">
            <Text className="text-gray-500 mb-2">Total Drivers</Text>
            <Text className="text-3xl font-JakartaBold">312</Text>
          </View>

          <View className="bg-white w-[280px] p-6 rounded-xl shadow">
            <Text className="text-gray-500 mb-2">Pending Verifications</Text>
            <Text className="text-3xl font-JakartaBold text-orange-500">
              8
            </Text>
          </View>

          <View className="bg-white w-[280px] p-6 rounded-xl shadow">
            <Text className="text-gray-500 mb-2">Completed Rides</Text>
            <Text className="text-3xl font-JakartaBold text-green-600">
              4,892
            </Text>
          </View>
        </View>

        {/* DRIVER VERIFICATION */}
        <View className="mt-10">
          <Text className="text-xl font-JakartaBold mb-4">
            Driver Verification Requests
          </Text>

          <View className="bg-white rounded-xl shadow p-6">
            <View className="flex-row justify-between border-b pb-3 mb-4">
              <Text className="font-JakartaSemiBold w-[200px]">Name</Text>
              <Text className="font-JakartaSemiBold w-[200px]">Email</Text>
              <Text className="font-JakartaSemiBold w-[150px]">Status</Text>
              <Text className="font-JakartaSemiBold w-[200px] text-right">
                Action
              </Text>
            </View>

            <View className="py-10">
              <Text className="text-center text-gray-400">
                No pending driver verifications
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;

