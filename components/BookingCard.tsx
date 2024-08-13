import React from "react";
import { Booking } from "@/types";
import { Card, Text, VStack, Heading, HStack, Badge, BadgeText, BadgeIcon, EditIcon } from "@gluestack-ui/themed";
import { GlobeIcon } from "@gluestack-ui/themed";
import { Foundation } from "@expo/vector-icons";
interface CardProps {
  item: Booking;
  showBadge?: boolean; // New prop to control the visibility of the badge
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

const BookingCard: React.FC<CardProps> = ({ item, showBadge = false }) => {
  const startDate = formatDate(item.start);
  const endDate = formatDate(item.end);
  return (
    <Card p="$5" borderRadius="$lg" width={335} m="$3">
      <HStack justifyContent="space-between" alignItems="center" mb="$2">
        <Text
          fontSize="$sm"
          fontStyle="normal"
          fontFamily="$heading"
          fontWeight="$normal"
          lineHeight="$sm"
          sx={{
            color: "$textLight700",
            _dark: {
              color: "$textDark200",
            },
          }}
        >
          {item.username}
        </Text>
        {showBadge && (
          <Badge size="md" variant="solid" borderRadius="$none" action="warning">
            <BadgeText>Press to Edit</BadgeText>
            <BadgeIcon as={EditIcon} ml="$2" />
          </Badge>
        )}
      </HStack>
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
