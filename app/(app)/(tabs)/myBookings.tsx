import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import Booking from "@/types";
import { useSession } from "@/ctx";
import { Pressable, SafeAreaView, ScrollView } from "@gluestack-ui/themed";
import BookingCard from "@/components/BookingCard";
import { Link } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

// Function to format the date as "Month Day, Year"
const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

export default function Settings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const { getSessionId } = useSession();
  const token = getSessionId();

  const fetchBookings = () => {
    fetch(`http://192.168.1.40:8000/api/my_bookings`, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  useFocusEffect(
    useCallback(() => {
      fetchBookings();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        {bookings.length === 0 && <Text>No Bookings</Text>}
        {bookings.map((item) => (
          <Pressable key={item.id}>
            <Link href={{ pathname: '/edit/[id]', params: { id: item.id } }}>
              <BookingCard item={item} showBadge={true} />
            </Link>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
