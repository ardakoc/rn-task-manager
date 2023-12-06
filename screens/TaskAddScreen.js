import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const TaskAddScreen = ({ route, navigation }) => {
    const { onAddTask } = route.params
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDetails, setTaskDetails] = useState('')
    const [taskCompleted, setTaskCompleted] = useState(false)

    const handleAddTask = () => {
        const newTask = { title: taskTitle, details: taskDetails, completed: taskCompleted }
        onAddTask(newTask)
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formElement}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Task title"
                    value={taskTitle}
                    onChangeText={(text) => setTaskTitle(text)}
                />
            </View>
            <View style={styles.formElement}>
                <Text style={styles.label}>Details:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Task details"
                    value={taskDetails}
                    onChangeText={(text) => setTaskDetails(text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    formElement: {
        marginHorizontal: 24,
        marginTop: 16,
    },
    label: {
        marginTop: 8,
        marginBottom: 4,
    },
    input: {
        height: 40,
        borderColor: '#777',
        color: '#777',
        borderWidth: 1,
        paddingHorizontal: 16,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 12,
        marginTop: 40,
        marginHorizontal: 136,
        padding: 16,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
})

export default TaskAddScreen;