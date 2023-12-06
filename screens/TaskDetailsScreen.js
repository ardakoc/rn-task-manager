import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getTask, updateTask } from "../services/TaskService";

const TaskDetailsScreen = ({ route, navigation }) => {
    const { taskId, onUpdateTask } = route.params
    const [editedTask, setEditedTask] = useState({ id: '', title: '', details: '' })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTaskDetails = async () => {
            setLoading(true)
            const taskDetails = await getTask(taskId)
            if (taskDetails) {
                setEditedTask(taskDetails)
            }
            setLoading(false)
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
            {loading ? (
                <ActivityIndicator style={styles.loading} size='large' color='#000' />
            ) : (
                <>
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
                    <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                        <Text style={styles.buttonText}>Update Task</Text>
                    </TouchableOpacity>
                </>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    loading : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default TaskDetailsScreen;