import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView, Accordion, AccordionContent, AccordionContentText, AccordionHeader, AccordionIcon, AccordionTrigger, AccordionItem, AccordionTitleText } from '@gluestack-ui/themed';
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import  BookingCard  from "@/components/BookingCard";
import Booking from "@/types";
import { useSession } from '@/ctx';
// import { ScrollView } from 'react-native-gesture-handler';

// Function to format the date as "Month Day, Year"
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

// Get today's date
const today = new Date();

// Get tomorrow's date
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const afterTomorrow = new Date(tomorrow);
afterTomorrow.setDate(afterTomorrow.getDate() + 1);

const bookingss: Booking[] = [
  {
    id: 1,
    name: 'Project Kickoff',
    description: 'Initial meeting to discuss project requirements and timelines.',
    start: '2024-08-10T10:00:00Z',
    end: '2024-08-10T11:00:00Z',
    creator: 'Jane Smith',
  },
  {
    id: 2,
    name: 'Design Review',
    description: 'Review the design specifications and make adjustments.',
    start: '2024-08-11T14:00:00Z',
    end: '2024-08-11T15:00:00Z',
    creator: 'John Doe',
  },
  {
    id: 3,
    name: 'Sprint Planning',
    description: 'Plan the tasks for the upcoming sprint.',
    start: '2024-08-12T09:00:00Z',
    end: '2024-08-12T10:30:00Z',
    creator: 'Alice Johnson',
  },
];



export default function Settings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const { getSessionId } = useSession();
  const token = getSessionId(); 

  useEffect(() => {
    fetch('http://192.168.1.106:8000/api/get_bookings', {
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error('Error fetching bookings:', error));
  }, []);


  return (
    <ScrollView >
      <Accordion m="$5" width="90%" size="md" variant="filled" type="single" isCollapsible={false} isDisabled={false} defaultValue="a">
        <AccordionItem value="a">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>
                      {formatDate(today)}
                    </AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} ml="$3"/>
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} ml="$3"/>
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>
              {bookings.map((item) => ( <BookingCard item={item} />))}
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
                      <AccordionIcon as={ChevronUpIcon} ml="$3"/>
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} ml="$3"/>
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>
              {bookingss.map((item) => ( <BookingCard item={item} />))}
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
                      <AccordionIcon as={ChevronUpIcon} ml="$3"/>
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} ml="$3"/>
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <AccordionContentText>
            {bookingss.map((item) => ( <BookingCard item={item} />))}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
