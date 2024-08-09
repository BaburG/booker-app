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
  const [todayBookings, setTodayBookings] = useState<Booking[]>([]);
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
      `http://192.168.1.106:8000/api/get_bookings?date=${todayFormattedDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setTodayBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  

    fetch(
      `http://192.168.1.106:8000/api/get_bookings?date=${tomorrowFormattedDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setTomorrowBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));

    fetch(
      `http://192.168.1.106:8000/api/get_bookings?date=${afterTomorrowFormattedDate}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setAfterTomorrowBookings(data))
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
        isCollapsible={false}
        isDisabled={false}
        borderBottomWidth={1}
        borderColor="$borderLight300"
        $dark-borderColor="$borderDark700"
        defaultValue="a"
      >
        <AccordionItem value="a">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>{formatDate(today)}</AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} ml="$3" />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} ml="$3" />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>
              {todayBookings.length === 0 && <Text>No Bookings</Text>}
              {todayBookings.map((item) => (
                <BookingCard item={item} key={item.id}/>
              ))}
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>
                      {formatDate(tomorrow)}
                    </AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} ml="$3" />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} ml="$3" />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>
            {tomorrowBookings.length === 0 && <Text>No Bookings</Text>}
              {tomorrowBookings.map((item) => (
                <BookingCard item={item} key={item.id}/>
              ))}
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="c">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>
                      {formatDate(afterTomorrow)}
                    </AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} ml="$3" />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} ml="$3" />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>
            {afterTomorrowBookings.length === 0 && <Text>No Bookings</Text>}
              {afterTomorrowBookings.map((item) => (
                <BookingCard item={item} key={item.id}/>
              ))}
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
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
