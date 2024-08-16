import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView, Alert } from "react-native";
import { Card } from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useSession } from "@/ctx"; // Assuming useSession is correctly defined in your context file
import { router } from "expo-router";
import { API_BASE_URL } from '@/config';

const CreateBookingForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [errorFields, setErrorFields] = useState({
    date: false,
    time: false,
    duration: false,
  });

  const { getSessionId } = useSession(); // Get session details here
  const token = getSessionId();

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

  const handleSubmit = async () => {
    // Check if all required fields are filled
    let isValid = true;
    let newErrorFields = { date: false, time: false, duration: false };
  
    if (!name.trim()) {
      isValid = false;
      Alert.alert("Error", "Name is required.");
    } else if (!duration.trim()) {
      isValid = false;
      newErrorFields.duration = true;
      Alert.alert("Error", "Duration is required.");
    } else if (!date) {
      isValid = false;
      newErrorFields.date = true;
      Alert.alert("Error", "Date is required.");
    } else if (!time) {
      isValid = false;
      newErrorFields.time = true;
      Alert.alert("Error", "Time is required.");
    }
  
    setErrorFields(newErrorFields);
  
    if (!isValid) {
      return; // Prevent form submission if any field is invalid
    }
  
    const formattedDate = date.toISOString().split("T")[0]; // Format date as 'YYYY-MM-DD'
    const formattedTime = time.toTimeString().split(" ")[0]; // Format time as 'HH:MM:SS'
  
    let start = new Date(formattedDate + "T" + formattedTime + "Z");
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
  
    axios
      .post(`${API_BASE_URL}/api/create_booking`, bookingData, {
        headers: {
          Authorization: `token ${token}`, // Ensure `token` is defined and accessible here
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.data.message === "Booking created successfully") {
          Alert.alert("Success", "Booking created successfully!");
          // Clear the fields
          setName("");
          setDescription("");
          setDate(new Date());
          setTime(new Date());
          setDuration("");
          setErrorFields({ date: false, time: false, duration: false });
          router.push("/(tabs)");
        }
      })
      .catch(function (error) {
        if (error.response && error.response.data) {
          const responseData = error.response.data;
  
          if (responseData.__all__) {
            Alert.alert("Error", responseData.__all__[0]);
            setErrorFields({ date: true, time: true, duration: true });
          }
        } else {
          console.error("Error submitting booking data:", error);
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card style={{ borderRadius: 10, padding: 16 }}>
        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 16 }}>
          Create Booking
        </Text>
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
            style={
              errorFields.date ? { borderColor: "red", borderWidth: 2 } : {}
            }
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text>Time:</Text>
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
            style={
              errorFields.time ? { borderColor: "red", borderWidth: 2 } : {}
            }
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text>Duration (minutes):</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              padding: 8,
              ...(errorFields.duration
                ? { borderColor: "red", borderWidth: 2 }
                : {}),
            }}
            value={duration}
            onChangeText={(text) => {
              setDuration(text);
              setErrorFields({ ...errorFields, duration: false });
            }}
            placeholder="Enter duration"
            keyboardType="numeric"
          />
          <Text style={{ fontSize: 12, color: "gray" }}>
            Enter duration in minutes
          </Text>
        </View>
        <Button title="Save" onPress={handleSubmit} />
      </Card>
    </ScrollView>
  );
};

export default CreateBookingForm;
