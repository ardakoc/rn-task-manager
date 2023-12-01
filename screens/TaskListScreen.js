import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import TaskList from "../components/TaskList";

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
})

const TaskListScreen = () => {
    const tasks = [
        { id: 1, title: 'Learn React Native' },
        { id: 2, title: 'Develop an app with React Native' },
    ]

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Task List</Text>
            <TaskList tasks={tasks} />
        </SafeAreaView>
    )
}

export default TaskListScreen;