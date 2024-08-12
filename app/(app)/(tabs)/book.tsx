import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { Card } from '@gluestack-ui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useSession } from "@/ctx"; // Assuming useSession is correctly defined in your context file

const CreateBookingForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState('');

  const { getSessionId } = useSession(); // Get session details here
  const token = getSessionId();

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  const handleSubmit = async () => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    const formattedTime = time.toTimeString().split(' ')[0]; // Format time as 'HH:MM:SS'

    let start = new Date(formattedDate + 'T' + formattedTime + 'Z');
    let end = new Date(start);

    if (duration) {
      end.setMinutes(start.getMinutes() + parseInt(duration));
    }

    const bookingData = {
      name,
      description,
      start,
      end,
    };

    try { 
      const response = await axios.post('http://192.168.1.70:8000/api/token', bookingData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting booking data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card style={{ borderRadius: 10, padding: 16 }}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 16 }}>Create Booking</Text>
        <View style={{ marginBottom: 16 }}>
          <Text>Name:</Text>
          <TextInput
            style={{ borderBottomWidth: 1, padding: 8 }}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text>Description:</Text>
          <TextInput
            style={{ borderBottomWidth: 1, padding: 8 }}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text>Date:</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text>Time:</Text>
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text>Duration (minutes):</Text>
          <TextInput
            style={{ borderBottomWidth: 1, padding: 8 }}
            value={duration}
            onChangeText={setDuration}
            placeholder="Enter duration"
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 12, color: 'gray' }}>Enter duration in minutes</Text>
        </View>
        <Button title="Save" onPress={handleSubmit} />
      </Card>
    </ScrollView>
  );
};

export default CreateBookingForm;
