import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Accordion, AccordionContent, AccordionContentText, AccordionHeader, AccordionIcon, AccordionTrigger, AccordionItem, AccordionTitleText } from '@gluestack-ui/themed';
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import  BookingCard  from "@/components/BookingCard";

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

export default function Settings() {
  return (
    <View style={styles.container}>
      
      <Accordion m="$5" width="90%" size="md" variant="filled" type="single" isCollapsible={false} isDisabled={false} >
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
              To place an order, simply select the products you want, proceed to
              checkout, provide shipping and payment information, and finalize
              your purchase.
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
              We accept all major credit cards, including Visa, Mastercard, and
              American Express. We also support payments through PayPal.
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
              We accept all major credit cards, including Visa, Mastercard, and
              American Express. We also support payments through PayPal.
            </AccordionContentText>
          </AccordionContent>
        </AccordionItem>
        </Accordion>
      
    </View>
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
