import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: "Book",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="calendar-plus"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="myBookings"
        options={{
          title: "My Bookings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              size={28}
              name="edit-calendar"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
