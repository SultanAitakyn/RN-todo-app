// Sultan Aitakyn, 20MD0105

import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import { Switch } from 'react-native-paper';

interface IToDo {
  text: string;
  date: string;
  remind: boolean;
}

export default function App() {
  const [value, setValue] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [toDoList, setToDos] = useState<IToDo[]>([]);
  const [error, showError] = useState<boolean>(false);
  const [remind, setRemind] = useState<boolean>(false);

  const handleSubmit = (): void => {
    if (value.trim() && date.trim()) {
      setToDos([...toDoList, { text: value, remind: remind, date: date }]);
      setValue("");
      setDate("");
      setRemind(false);
    }
    else showError(true);
  };

  const removeItem = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDos(newToDoList);
  };

  const toggleComplete = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList[index].remind = !newToDoList[index].remind;
    setToDos(newToDoList);
  };

  return (
      <PaperProvider>
        <View style={styles.container}>
          <Text style={styles.title}>Todo List</Text>
          <View style={styles.inputWrapper}>
            <Text>Task</Text>
            <TextInput
                placeholder="Enter your todo task..."
                value={value}
                onChangeText={e => {
                  setValue(e);
                  showError(false);
                }}
                style={styles.inputBox}
            />
            <Text>Date and time</Text>
            <TextInput
                placeholder="Enter date and time..."
                value={date}
                onChangeText={e => {
                  setDate(e);
                  showError(false);
                }}
                style={styles.inputBox}
            />
            <Text>Remind</Text>
            <Switch
                value={remind}
                onValueChange={() => {
                  setRemind(!remind);
                }}
            />
            <Button title="Add Task" onPress={handleSubmit}/>
          </View>
          {error && (
              <Text style={styles.error}>Error: Input field is empty...</Text>
          )}
          <Text style={styles.subtitle}>Your Tasks :</Text>
          {toDoList.length === 0 && <Text>No to do task available</Text>}
          {toDoList.map((toDo: IToDo, index: number) => (
              <View style={styles.listItem} key={`${index}_${toDo.text}`}>
                <Text
                    onPress={() => toggleComplete(index)}
                    style={[
                      styles.task,
                      {backgroundColor: toDo.remind ? "#2196F3" : ""}
                    ]}
                >
                  {toDo.text} {"\n"}
                  {toDo.date}
                </Text>
                <Button
                    title={toDo.remind ? "Do not remind" : "Remind"}
                    onPress={() => toggleComplete(index)}
                />
                <Button
                    title="X"
                    onPress={() => {
                      removeItem(index);
                    }}
                    color="crimson"
                />
              </View>
          ))}
        </View>
      </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: "center"
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems:"center",
    marginBottom: 20
  },
  inputBox: {
    width: 200,
    borderColor: "purple",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
    marginBottom: 10
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "purple"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  },
  addButton: {
    alignItems: "flex-end"
  },
  task: {
    width: 200
  },
  error: {
    color: "red"
  }
});
