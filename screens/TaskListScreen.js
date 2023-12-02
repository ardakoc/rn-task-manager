import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
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

const TaskListScreen = () => {
    const navigation = useNavigation();
    const tasks = [
        { id: 1, title: 'Learn React Native' },
        { id: 2, title: 'Develop an app with React Native' },
    ]

    const handleAddTask = (newTask) => {
        // TODO: implement this function.
    }

    return (
        <SafeAreaView style={styles.container}>
            <TaskList tasks={tasks} />
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() =>
                    navigation.navigate('Add Task', { onAddTask: handleAddTask })
                }
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}  

export default TaskListScreen;