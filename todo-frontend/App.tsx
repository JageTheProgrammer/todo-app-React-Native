import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "./components/Settings";
import { ThemeProvider, ThemeContext } from "./ThemeContext";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const API_URL = "http://localhost:5000/api/todos";
const Stack = createNativeStackNavigator();

function TodoScreen({ navigation }: any) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const { color } = useContext(ThemeContext);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    await axios.post(API_URL, { title });
    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    await axios.put(`${API_URL}/${id}`, { completed: !completed });
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const theme = darkMode ? darkStyles(color) : lightStyles(color);

  return (
    <View style={[theme.container]}>
      <Text style={theme.header}>Todo App</Text>
      <View style={theme.inputContainer}>
        <TextInput
          style={theme.input}
          placeholder="Add a new task..."
          placeholderTextColor={darkMode ? "#aaa" : "#555"}
          value={title}
          onChangeText={setTitle}
        />
        <Button title="Add" onPress={addTodo} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={theme.todoItem}
            onPress={() => toggleTodo(item._id, item.completed)}
            onLongPress={() => deleteTodo(item._id)}
          >
            <Text
              style={[
                theme.todoText,
                item.completed && theme.completedText,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.toggleButton, { backgroundColor: color }]}
        >
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? "#f4f3f4" : "#0d0d0dff"}
            trackColor={{ false: "#767577", true: "#000000ff" }}
            style={{ transform: [{ scale: 1.2 }] }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.settingsButton, { backgroundColor: color }]}
        onPress={() => navigation.navigate("Settings")}
        activeOpacity={0.7}
      >
        <Image
          source={{
            uri: "https://www.freeiconspng.com/thumbs/color-icons/colors-icon-4.png",
          }}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Todo"
            component={TodoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={({ route }) => ({
              title: "Settings",
              headerStyle: { backgroundColor: "#000000ff" },
              headerTintColor: "#fff",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}


const darkStyles = (accent: string) =>
  StyleSheet.create({
    container: { flex: 1, padding: 80, backgroundColor: "#1e1e1fff" },
    header: {
      color: accent,
      fontSize: 40,
      fontWeight: "800",
      marginBottom: 20,
      textAlign: "center",
    },
    inputContainer: { flexDirection: "row", marginBottom: 20 },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#fff",
      color: "#fff",
      padding: 10,
      marginRight: 10,
      borderRadius: 5,
    },
    todoItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#444" },
    todoText: { fontSize: 18, color: "#fff" },
    completedText: { textDecorationLine: "line-through", color: "gray" },
  });

const lightStyles = (accent: string) =>
  StyleSheet.create({
    container: { flex: 1, padding: 80, backgroundColor: "#d9d9d9ff" },
    header: {
      color: accent,
      fontSize: 40,
      fontWeight: "800",
      marginBottom: 20,
      textAlign: "center",
    },
    inputContainer: { flexDirection: "row", marginBottom: 20 },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#333",
      color: "#000",
      padding: 10,
      marginRight: 10,
      borderRadius: 5,
    },
    todoItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" },
    todoText: { fontSize: 18, color: "#000" },
    completedText: { textDecorationLine: "line-through", color: "#888" },
  });

const styles = StyleSheet.create({
  toggleContainer: {
    position: "absolute",
    bottom: 30,
    right: 25,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 40,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsButton: {
    position: "absolute",
    bottom: 30,
    left: 25,
    backgroundColor: "#000000ff",
    borderRadius: 50,
    padding: 14,
    elevation: 10,
    shadowColor: "#0a0a0aff",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },


  settingsIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },

});
