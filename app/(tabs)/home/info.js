import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { useRouter } from "expo-router";

const info = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const dueDate = params?.dueDate;
  const currentDate = moment().format("DD-MM-YYYY");
  const dueDateMoment = moment(dueDate, "DD-MM-YYYY");
  const currentDateMoment = moment(currentDate, "DD-MM-YYYY");

  const daysDifference = dueDateMoment.diff(currentDateMoment, "days");
  console.log(daysDifference);

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons
        
        onPress={() => {
          router?.push({
            pathname: "/home",            
          });
        }}
          name="arrow-back" size={24} color="black" />
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>

      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>
          Category - {params?.category}
        </Text>
      </View>

      <Text style={{ marginTop: 20, fontSize: 17, fontWeight: "600" }}>
        {params?.title}
      </Text>

      <View style={{ marginTop: 50 }} />

      {/* <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <AntDesign name="plus" size={24} color="#7CB9E8" />
        <Text style={{ color: "#7CB9E8", fontSize: 16, fontWeight: "500" }}>
          Add a subtask
        </Text>
      </Pressable> */}

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text>Date Added</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>{params?.dueDate}</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <MaterialCommunityIcons
              name="list-status"
              size={24}
              color="black"
            />
            <Text>Status</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>{params?.status}</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <MaterialCommunityIcons
              name="list-status"
              size={24}
              color="black"
            />
            <Text>Time Passed</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text> {daysDifference} days </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          marginTop: 25,
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Image
          style={{ width: 280, height: 230 }}
          source={{
            uri: "https://t3.ftcdn.net/jpg/03/98/04/58/360_F_398045805_lGhwOWW5YwG78uhDF12wgmsiroKbmo0O.jpg",
          }}
        />
      </View>

      {/* <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Ionicons name="time-sharp" size={24} color="gray" />
            <Text>Time and Reminder</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
      </View> */}

      {/* <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Feather name="repeat" size={24} color="black" />
            <Text>Repeat Task</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
      </View> */}

      {/* <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <SimpleLineIcons name="note" size={24} color="black" />
            <Text>Notes</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#F0F0F0", padding: 7, borderRadius: 6 }}
          >
            <Text>Not Added</Text>
          </Pressable>
        </View>
      </View> */}
    </View>
  );
};

export default info;

const styles = StyleSheet.create({});
