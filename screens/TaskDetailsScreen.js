import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { getCategories } from "../services/CategoryService";
import { getTask, updateTask } from "../services/TaskService";

const TaskDetailsScreen = ({ route, navigation }) => {
    const { taskId, onUpdateTask } = route.params
    const [categories, setCategories] = useState([]);
    const [editedTask, setEditedTask] = useState({ id: '', title: '', details: '', category: '' })
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
        const fetchCategories = async () => {
            setLoading(true)
            const categoriesData = await getCategories()
            setCategories(categoriesData)
            setLoading(false)
        }
        fetchTaskDetails()
        fetchCategories()
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
                    <View style={styles.formElement}>
                        <Text style={styles.label}>Category:</Text>
                        <RNPickerSelect
                            value={editedTask.category}
                            onValueChange={(value) => setEditedTask({ ...editedTask, category: value})}
                            items={categories.map((category) => ({ label: category, value: category }))}
                            style={{
                                ...pickerSelectStyles,
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                },
                            }}
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
        borderWidth: 1,
        paddingHorizontal: 16,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        marginTop: 40,
        marginHorizontal: 136,
        padding: 16,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#777',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 0.5,
        borderColor: '#777',
        paddingRight: 30,
    },
})

export default TaskDetailsScreen;