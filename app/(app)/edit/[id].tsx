import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Card } from '@gluestack-ui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useSession } from '@/ctx'; // Assuming useSession is correctly defined in your context file
import { API_BASE_URL } from '@/config';

export default function EditBookingScreen() {
  const { id } = useLocalSearchParams(); // Get the booking ID from the params
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorFields, setErrorFields] = useState({
    name: false,
    date: false,
    time: false,
    duration: false,
  });

  const { getSessionId } = useSession(); // Get session details here
  const token = getSessionId();
  const navigation = useNavigation();

  useEffect(() => {
    // Set the screen title and back button label
    navigation.setOptions({
      title: 'Edit Booking',
      headerBackTitle: 'My Bookings',
    });

    // Fetch booking details on component mount
    axios
      .get(`${API_BASE_URL}/api/get_booking`, {
        params: { id: id },
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        const booking = response.data;
        setName(booking.name);
        setDescription(booking.description);
        setDate(new Date(booking.start));
        setTime(new Date(booking.start));
        setDuration(
          Math.floor((new Date(booking.end) - new Date(booking.start)) / 60000) // Duration in minutes
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching booking details:', error);
        setLoading(false);
      });
  }, [id, token]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setErrorFields({ ...errorFields, date: false });
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    setErrorFields({ ...errorFields, time: false });
  };

  const validateFields = () => {
    const errors = {};
    if (!name) errors.name = true;
    if (!date) errors.date = true;
    if (!time) errors.time = true;
    if (!duration || duration < 15 || duration >= 3600) errors.duration = true;

    setErrorFields(errors);

    return Object.keys(errors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateFields()) {
      Alert.alert('Error', 'Please fill all fields correctly.');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = time.toTimeString().split(' ')[0];

    let start = new Date(`${formattedDate}T${formattedTime}Z`);
    let end = new Date(start);

    if (duration) {
      end.setMinutes(start.getMinutes() + parseInt(duration));
    }

    const updatedBookingData = {
      name,
      description,
      start,
      end,
    };

    axios
      .put(`${API_BASE_URL}/api/update_booking`, updatedBookingData, {
        params: {
          id: id,
        },
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.data.message === 'Booking updated successfully') {
          Alert.alert('Success', 'Booking updated successfully!', [
            { text: 'OK', onPress: () => router.back() },
          ]);
        }
      })
      .catch((error) => {
        console.error('Error updating booking data:', error);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${API_BASE_URL}/api/delete_booking`, {
        params: {
          id: id,
        },
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then(() => {
        Alert.alert('Success', 'Booking deleted successfully!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      })
      .catch((error) => {
        console.error('Error deleting booking:', error);
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card style={{ borderRadius: 10, padding: 16 }}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 16, color: 'gray' }}>
          Edit Booking
        </Text>
        <View style={{ marginBottom: 16 }}>
          <Text>Name:</Text>
          <TextInput
            style={{ borderBottomWidth: 1, padding: 8, color: 'gray', ...(errorFields.name ? { borderColor: 'red', borderWidth: 2 } : {}) }}
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrorFields({ ...errorFields, name: false });
            }}
            placeholder="Enter name"
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text>Description:</Text>
          <TextInput
            style={{ borderBottomWidth: 1, padding: 8, color: 'gray' }}
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
            style={errorFields.date ? { borderColor: 'red', borderWidth: 2 } : {}}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text>Time:</Text>
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
            style={errorFields.time ? { borderColor: 'red', borderWidth: 2 } : {}}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text>Duration (minutes):</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              padding: 8,
              color: 'gray',
              ...(errorFields.duration
                ? { borderColor: 'red', borderWidth: 2 }
                : {}),
            }}
            value={duration.toString()}
            onChangeText={(text) => {
              setDuration(text);
              setErrorFields({ ...errorFields, duration: false });
            }}
            placeholder="Enter duration"
            keyboardType="numeric"
          />
        </View>
        <Button title="Save Changes" onPress={handleUpdate} />
        <Button title="Delete Booking" onPress={handleDelete} color="red" />
      </Card>
    </ScrollView>
  );
}
