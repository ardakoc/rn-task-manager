import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from "react-native";

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

const TaskAddScreen = ({ navigation }) => {
    const [taskTitle, setTaskTitle] = useState('')

    const addTaskFunction = addTask === 'ADD_TASK_FUNCTION' ? handleAddTask : null

    const addTask = () => {
        // TODO: Add task function.
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Task title"
                value={taskTitle}
                onChangeText={(text) => setTaskTitle(text)}
            />
            <Button title="Submit" onPress={addTask} />
        </SafeAreaView>
    )
}

export default TaskAddScreen;