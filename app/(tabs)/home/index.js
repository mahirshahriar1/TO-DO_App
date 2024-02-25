import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const index = () => {
  const todos = [];
  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#6ca7d4",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>All</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#6ca7d4",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Work</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#6ca7d4",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Personal</Text>
        </Pressable>
        <AntDesign name="pluscircle" size={30} color="#007fff" />
        <Pressable />
      </View>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View> </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 130,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ width: 200, height: 200, resizeMode: "contain" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                No Tasks for today! add a task
              </Text>
              <Pressable style={{ marginTop: 15 }}>
                <AntDesign name="pluscircle" size={30} color="#007fff" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
