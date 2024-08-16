import React, { useState, useCallback } from "react";
import { SectionList, Center, Box, Heading, Divider } from "@gluestack-ui/themed";
import Booking from "@/types";
import { useSession } from "@/ctx";
import BookingCard from "@/components/BookingCard";
import { useFocusEffect } from "@react-navigation/native";
import { API_BASE_URL } from '@/config';

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const getWeekStartDate = (date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  return startOfWeek;
};

export default function Index() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sections, setSections] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStartDate(new Date()));

  const { getSessionId } = useSession();
  const token = getSessionId();

  const fetchBookingsForWeek = useCallback(
    (weekStart) => {
      const weekFormattedDate = weekStart.toISOString().split("T")[0];

      fetch(`${API_BASE_URL}/api/get_week_bookings?date=${weekFormattedDate}`, {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // This returns a promise
      })
        .then((data) => {
          const transformedSections = Object.keys(data).map(date => ({
            title: date,
            data: data[date],
            key: `${date}-${weekFormattedDate}` 
          }));

          setSections((prevSections) => {
            const updatedSections = [...prevSections];

            transformedSections.forEach((newSection) => {
              const existingSectionIndex = updatedSections.findIndex(
                (section) => section.title === newSection.title
              );

              if (existingSectionIndex > -1) {
                // Merge the new data with the existing section data
                updatedSections[existingSectionIndex].data = [
                  ...updatedSections[existingSectionIndex].data,
                  ...newSection.data,
                ];
              } else {
                // Add new section
                updatedSections.push(newSection);
              }
            });

            return updatedSections;
          });
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    },
    [token]
  );

  useFocusEffect(
    useCallback(() => {
      fetchBookingsForWeek(currentWeekStart);
    }, [fetchBookingsForWeek, currentWeekStart])
  );

  const loadNextWeek = useCallback(() => {
    setCurrentWeekStart((prevWeekStart) => {
      const nextWeekStart = new Date(prevWeekStart);
      nextWeekStart.setDate(prevWeekStart.getDate() + 7);
      fetchBookingsForWeek(nextWeekStart); // Fetch the bookings for the new week
      return nextWeekStart;
    });
  }, [fetchBookingsForWeek]);

  return (
    <>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Ensuring item keys are unique
        renderItem={({ item }) => (
          <Center>
            <BookingCard item={item} />
          </Center>
        )}
        renderSectionHeader={({ section: { title, key } }) => (
          <Box bg="$secondary100" key={key}>
            <Heading style={{ fontWeight: 'bold' }}>{title}</Heading>
            <Divider />
          </Box>
        )}
        onEndReached={loadNextWeek}
        onEndReachedThreshold={0.1} // Adjust this value based on when you want to trigger loading more data
      />
    </>
  );
}