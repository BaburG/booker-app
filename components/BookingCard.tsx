import React from 'react';
import { Booking } from '@/types';
import { Card, Text, VStack,Heading,  } from '@gluestack-ui/themed';


interface CardProps {
    item: Booking;
}

const BookingCard: React.FC<CardProps> = ({item}) => {
    return (
        <Card p="$5" borderRadius="$lg" maxWidth={360} m="$3">
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
      <VStack mb="$6">
        <Heading size="md" fontFamily="$heading" mb="$4">
          {item.name}
        </Heading>
        <Text size="sm" fontFamily="$heading">
          {item.description}
          {item.start}
          {item.end}
        </Text>
      </VStack>
    </Card>
    )
}

export default BookingCard;