import { Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import { Text } from "react-native";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const today = moment().format("DD-MM-YYYY");
  const [selectedDate, setSelectedDate] = useState(today);
  const [md, setmd] = useState(moment().format("YYYY-MM-DD"));
  const [todos, setTodos] = useState([]);
  const [dropdown, setDropdown] = useState(true);

  const fetchCompletedTodos = async () => {
    // console.log("selectedDate", selectedDate);

    try {
      const userID = await AsyncStorage.getItem("userId");
      console.log("userID", userID);
      const response = await axios.get(
        `http://10.0.2.2:3000/todos/completed/${selectedDate}/${userID}`
      );

      const completedTodos = response.data.completedTodos || [];
      setTodos(completedTodos);
      console.log("completedTodos", completedTodos);
    } catch (error) {
      console.log("error", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      console.log("tab focused");
      fetchCompletedTodos();

      // Replace the console.log with the code you want to execute when the tab is focused
    }, [selectedDate])
  );
  
  // console.log(todos);

  const handleDayPress = (day) => {
    setmd(day.dateString);
    const date = moment(day.dateString).format("DD-MM-YYYY");
    setSelectedDate(date);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [md]: { selected: true, selectedColor: "#007FFF" },
        }}
      />

      <View style={{ marginTop: 20 }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <Text>Completed Tasks</Text>
        <MaterialIcons
          onPress={() => setDropdown((dropdown) => !dropdown)}
          name="arrow-drop-down"
          size={30}
          color="black"
        />
      </View>

      {dropdown && todos?.map((item, index) => (
        <Pressable
          style={{
            backgroundColor: "#E0E0E0",
            padding: 10,
            borderRadius: 7,
            marginVertical: 10,
            marginHorizontal: 10,
          }}
          key={index}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome name="circle" size={18} color="gray" />
            <Text
              style={{
                flex: 1,
                textDecorationLine: "line-through",
                color: "gray",
              }}
            >
              {item?.title}
            </Text>
            <Feather name="flag" size={20} color="gray" />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default index;
