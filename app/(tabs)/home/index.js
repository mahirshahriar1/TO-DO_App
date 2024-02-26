import {
  Pressable,
  TouchableNativeFeedback,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment";
import { Alert } from "react-native";
import {
  Ionicons,
  Entypo,
  Feather,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";


const index = () => {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("All");
  const [marked, setMarked] = useState("false");
  const today = moment().format("MMM Do");
  const [dropdown, setDropdown] = useState(true);

  const suggestions = [
    {
      id: "0",
      todo: "Drink Water, keep healthy",
    },
    {
      id: "1",
      todo: "Go Excercising",
    },
    {
      id: "2",
      todo: "Go to bed early",
    },
    {
      id: "3",
      todo: "Take pill reminder",
    },
    {
      id: "4",
      todo: "Go Shopping",
    },
    {
      id: "5",
      todo: "finish assignments",
    },
  ];

  // console.log("category", category); 
  const addTodo = async () => {
    try {
      const userID = await AsyncStorage.getItem("userId");
      const todoData = {
        title: todo,
        category: category,
        userID: userID,
      };

      // console.log("userID", userID);
      axios
        .post(`http://10.0.2.2:3000/todos/${userID}`, todoData)
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          console.log("error", error);
        });

      await getUserTodos();
      setModalVisible(false);
      setTodo("");
   
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUserTodos();
  }, [marked, isModalVisible]);

  const getUserTodos = async () => {
    try {
      const userID = await AsyncStorage.getItem("userId");
      const response = await axios.get(
        `http://10.0.2.2:3000/users/${userID}/todos`
      );

      // console.log(response.data.todos);
      setTodos(response.data.todos);
      const fetchedTodos = response.data.todos || [];
      const pending = fetchedTodos.filter(
        (todo) => todo.status !== "completed"
      );
      const completed = fetchedTodos.filter(
        (todo) => todo.status === "completed"
      );
      setPendingTodos(pending);
      setCompletedTodos(completed);
    } catch (error) {
      console.log("error", error);
    }
  };
  const markTodoAsCompleted = async (todoId) => {
    try {
      setMarked(true);
      const response = await axios.patch(
        `http://10.0.2.2:3000/todos/${todoId}/complete`
      );
      //make and alert
      Alert.alert("Task Completed", "Good Job! Keep it up");
      // console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const markTodoAsPending = async (todoId) => {
    try {
      setMarked(false);
      const response = await axios.patch(
        `http://10.0.2.2:3000/todos/${todoId}/pending`
      );
      //make and alert
      Alert.alert("Task undone", "You can do it!");
      // console.log(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // console.log("completed", completedTodos);
  // console.log("pending", pendingTodos);

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
            backgroundColor: "#007FFF",
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
            backgroundColor: "#007FFF",
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
            backgroundColor: "#007FFF",
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
        <AntDesign
          onPress={() => setModalVisible((isModalVisible) => !isModalVisible)}
          name="pluscircle"
          size={30}
          color="#007FFF"
        />
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
            <View>
              {pendingTodos?.length > 0 && <Text>Tasks to Do! {today}</Text>}
              {pendingTodos?.map((item, index) => (
                <Pressable
                  onPress={() => {
                    router?.push({
                      pathname: "/home/info",
                      params: {
                        id: item._id,
                        title: item?.title,
                        category: item?.category,
                        createdAt: item?.createdAt,
                        dueDate: item?.dueDate,
                        status : 'pending'
                      },
                    });
                  }}
                  style={{
                    backgroundColor: "#E0E0E0",
                    padding: 10,
                    borderRadius: 7,
                    marginVertical: 10,
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
                    <Entypo
                      onPress={() => markTodoAsCompleted(item?._id)}
                      name="circle"
                      size={18}
                      color="black"
                    />
                    <Text style={{ flex: 1 }}>{item?.title}</Text>
                    <Feather name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}
              {completedTodos?.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Image
                      style={{ width: 80, height: 80 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      marginVertical: 10,
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

                  {dropdown && completedTodos?.map((item, index) => (
                    <Pressable
                      style={{
                        backgroundColor: "#E0E0E0",
                        padding: 10,
                        borderRadius: 7,
                        marginVertical: 10,
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
                        <FontAwesome
                          onPress={() => markTodoAsPending(item?._id)}
                          name="circle"
                          size={18}
                          color="gray"
                        />
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
              )}
            </View>
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
              <Pressable
                onPress={() =>
                  setModalVisible((isModalVisible) => !isModalVisible)
                }
                style={{ marginTop: 15 }}
              >
                <AntDesign name="pluscircle" size={30} color="#007fff" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomModal
        onBackdropPress={() =>
          setModalVisible((isModalVisible) => !isModalVisible)
        }
        onHardwareBackPress={() =>
          setModalVisible((isModalVisible) => !isModalVisible)
        }
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => {
          setModalVisible(() => !isModalVisible);
        }}
      >
        <ModalContent style={{ width: "100%", height: 320 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input a new task here"
              style={{
                padding: 10,
                borderColor: "#E0E0E0",
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
              }}
            />
            <Ionicons onPress={addTodo} name="send" size={24} color="#007FFF" />
          </View>
          <Text style={{fontWeight:'bold'}}>Current Category - '{category}'</Text>
          <View style={{padding:5}}/>
          <Text>Choose Category</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setCategory("Work")}
              android_ripple={{ color: 'grey' }} 
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <Text>Work</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("Personal")}
              android_ripple={{ color: 'grey' }} 
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <Text>Personal</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("WishList")}
              android_ripple={{ color: 'grey' }} 
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borderRadius: 25,
              }}
            >
              <Text>WishList</Text>
            </Pressable>
          </View>

          <Text>Some sugggestions</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            {suggestions?.map((item, index) => (
              <Pressable
                onPress={() => setTodo(item?.todo)}
                style={{
                  backgroundColor: "#F0F8FF",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 25,
                }}
                key={index}
              >
                <Text style={{ textAlign: "center" }}>{item?.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
