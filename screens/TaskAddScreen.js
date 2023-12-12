import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { getCategories } from '../services/CategoryService';

const TaskAddScreen = ({ route, navigation }) => {
    const { onAddTask } = route.params

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDetails, setTaskDetails] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getCategories()
            setCategories(categoriesData)
        }
        fetchCategories()
    }, [])

    const handleAddTask = () => {
        const newTask = {
            title: taskTitle,
            details: taskDetails,
            completed: false,
            category: selectedCategory,
            created_on: new Date(),
        }
        onAddTask(newTask)
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formElement}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Task title'
                    value={taskTitle}
                    onChangeText={(text) => setTaskTitle(text)}
                />
            </View>
            <View style={styles.formElement}>
                <Text style={styles.label}>Details:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Task details'
                    value={taskDetails}
                    onChangeText={(text) => setTaskDetails(text)}
                />
            </View>
            <View style={styles.formElement}>
                <Text style={styles.label}>Category:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedCategory(value)}
                    items={categories.map((category) => ({ label: category, value: category }))}
                    style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                            top: 10,
                            right: 12,
                        },
                    }}
                    placeholder={{
                        label: 'Select a category',
                        value: null,
                        color: '#777',
                    }}
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

export default TaskAddScreen;