import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";

const TaskAddScreen = ({ route, navigation }) => {
    const { onAddTask, tasks } = route.params
    const [taskTitle, setTaskTitle] = useState('')

    const handleAddTask = () => {
        const newTask = { id: tasks.length + 1, title: taskTitle}
        onAddTask(newTask)
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Task title"
                value={taskTitle}
                onChangeText={(text) => setTaskTitle(text)}
            />
            <Button title="Submit" onPress={handleAddTask} />
        </SafeAreaView>
    )
}

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
    input: {
        height: 40,
        borderColor: 'gray', 
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
})

export default TaskAddScreen;