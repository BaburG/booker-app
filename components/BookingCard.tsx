import React from "react";
import { Booking } from "@/types";
import { Card, Text, VStack, Heading } from "@gluestack-ui/themed";

interface CardProps {
  item: Booking;
}

const formatDate = (dateString: string) => {
  const date = new Date(Date.parse(dateString));
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year}, ${hours}:${minutes}`;
};

const BookingCard: React.FC<CardProps> = ({ item }) => {
  const startDate = formatDate(item.start);
  const endDate = formatDate(item.end);
  return (
    <Card p="$5" borderRadius="$lg" width={335} m="$3">
      <Text
        fontSize="$sm"
        fontStyle="normal"
        fontFamily="$heading"
        fontWeight="$normal"
        lineHeight="$sm"
        mb="$2"
        sx={{
          color: "$textLight700",
          _dark: {
            color: "$textDark200",
          },
        }}
      >
        {item.username}
      </Text>
      <VStack mb="$2">
        <Heading size="md" fontFamily="$heading" mb="$2">
          {item.name}
        </Heading>
        <Text size="md" fontFamily="$heading">
          {item.description}
        </Text>
        <Text size="sm" fontFamily="$heading">
          Start: {startDate}
        </Text>
        <Text size="sm" fontFamily="$heading">
          End: {endDate}
        </Text>
      </VStack>
    </Card>
  );
};

export default BookingCard;
