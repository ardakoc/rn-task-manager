import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { getTask, updateTask } from "../services/TaskService";

const TaskDetailsScreen = ({ route, navigation }) => {
    const { taskId, onUpdateTask } = route.params
    const [editedTask, setEditedTask] = useState({ id: '', title: '', details: '' })

    useEffect(() => {
        const fetchTaskDetails = async () => {
            const taskDetails = await getTask(taskId)
            if (taskDetails) {
                setEditedTask(taskDetails)
            }
        }
        fetchTaskDetails()
    }, [taskId])

    const handleSaveChanges = async () => {
        await updateTask(editedTask.id, editedTask)
        onUpdateTask(editedTask)
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formElement}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    value={editedTask.title}
                    onChangeText={(text) => setEditedTask({ ...editedTask, title: text })}
                />
            </View>
            <View style={styles.formElement}>
                <Text style={styles.label}>Details:</Text>
                <TextInput
                    style={styles.input}
                    value={editedTask.details}
                    onChangeText={(text) => setEditedTask({ ...editedTask, details: text })}
                />
            </View>
            <Button title="Save Changes" onPress={handleSaveChanges} />
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
})

export default TaskDetailsScreen;