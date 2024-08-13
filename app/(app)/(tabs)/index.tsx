import React, { useEffect, useState } from "react";
import { ScrollView, Accordion, SectionList, View, Text, Box, Center, Heading, Divider } from "@gluestack-ui/themed";
import BookingAccordionItem from "@/components/BookingAccordionItem";
import Booking from "@/types";
import { useSession } from "@/ctx";
import BookingCard from "@/components/BookingCard";

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
  const [sections, setSections] = useState([]);

  const { getSessionId } = useSession();
  const token = getSessionId();

  const todayFormattedDate = today.toISOString().split("T")[0];

  useEffect(() => {
    fetch(
      `http://192.168.1.40:8000/api/get_week_bookings?date=${todayFormattedDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        
        // Transform the data into the required format for SectionList
        const transformedSections = Object.keys(data).map(date => ({
          title: date,
          data: data[date],
        }));

        setSections(transformedSections);
      })
      .catch((error) => console.error("Error fetching bookings:", error));


      
  }, []);

  return (
    <>
      <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.id.toString()}
      renderItem={({ item }) => (
        <Center>
          <BookingCard item={item} key={item.id} />
        </Center>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Box bg="$secondary100" >
        <Heading style={{ fontWeight: 'bold' }}>{title}</Heading>
        <Divider  />
        </Box>
        
      )}
    />
    </>
  );
}
