import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import TaskList from "../components/TaskList";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    addButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: '#4caf50',
        borderRadius: 50,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
    },
})

const TaskListScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Learn React Native' },
        { id: 2, title: 'Develop an app with React Native' },
    ])

    const handleAddTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask])
    }

    return (
        <SafeAreaView style={styles.container}>
            <TaskList tasks={tasks} />
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                    navigation.navigate('Add Task', { onAddTask: handleAddTask, tasks, setTasks })
                }}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}  

export default TaskListScreen;