import React from "react";
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
    Text
  } from "@gluestack-ui/themed";
  import BookingCard from "@/components/BookingCard";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";

// Function to format the date as "Month Day, Year"
const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };



export default function BookingAccordionItem( {date, BookingList, value}) {
    return (
        <AccordionItem value={value} 
        borderBottomWidth={1}
        borderColor="$borderLight300">
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText>{formatDate(date)}</AccordionTitleText>
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
              {BookingList.length === 0 && <Text>No Bookings</Text>}
              {BookingList.map((item) => (
                <BookingCard item={item} key={item.id}/>
              ))}
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
    )
}