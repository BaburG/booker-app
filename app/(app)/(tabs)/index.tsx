import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  ScrollView,
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionTrigger,
  AccordionItem,
  AccordionTitleText,
} from "@gluestack-ui/themed";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import BookingCard from "@/components/BookingCard";
import BookingAccordionItem from "@/components/BookingAccordionItem";
import Booking from "@/types";
import { useSession } from "@/ctx";
// import { ScrollView } from 'react-native-gesture-handler';

// Function to format the date as "Month Day, Year"
const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

// Get today's date
const today = new Date();

// Get tomorrow's date
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const afterTomorrow = new Date(tomorrow);
afterTomorrow.setDate(afterTomorrow.getDate() + 1);



export default function Index() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tomorrowBookings, setTomorrowBookings] = useState<Booking[]>([]);
  const [afterTomorrowBookings, setAfterTomorrowBookings] = useState<Booking[]>(
    []
  );

  const { getSessionId } = useSession();
  const token = getSessionId();

  const todayFormattedDate = today.toISOString().split("T")[0];
  const tomorrowFormattedDate = tomorrow.toISOString().split("T")[0];
  const afterTomorrowFormattedDate = afterTomorrow.toISOString().split("T")[0];


  useEffect(() => {
    
    fetch(
      `http://192.168.1.70:8000/api/get_week_bookings?date=${todayFormattedDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);


  return (
    <ScrollView>
      <Accordion
        m="$5"
        width="90%"
        size="md"
        variant="unfilled"
        type="single"
        isCollapsible={true}
        isDisabled={false}
        defaultValue={[Object.keys(bookings)[0]]}
      >
        {Object.entries(bookings).map(([date, BookingList], idx) => (
        <BookingAccordionItem
          value={idx + 1}
          key={date}
          date={new Date(date)} // Convert date string to Date object
          BookingList={BookingList}
        />))}
      </Accordion>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
