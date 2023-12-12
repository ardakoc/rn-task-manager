import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import TaskList from "../components/TaskList";
import { LogBox } from "react-native";
import { addTask, deleteTask, getTasks, completeTask } from "../services/TaskService";
import { getCategories } from '../services/CategoryService';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const TaskListScreen = ({ navigation }) => {
    const [allTasks, setAllTasks] = useState([])
    const [tasks, setTasks] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [sortBy, setSortBy] = useState('oldToNew')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAllTasks = async () => {
            const tasksData = await getTasks({ sortBy });
            setAllTasks(tasksData)
        }
        const fetchCategories = async () => {
            const categoriesData = await getCategories()
            setCategories(categoriesData)
        }
        const filterTasksByCategory = async () => {
            const filteredTasks = selectedCategory
                ? await getTasks({ category: selectedCategory, sortBy })
                : await getTasks({ sortBy })
            setTasks(filteredTasks)
        }
        const fetchData = async () => {
            setLoading(true);
            await fetchAllTasks();
            await fetchCategories();
            await filterTasksByCategory();
            setLoading(false);
        }
        fetchData()
    }, [selectedCategory, sortBy])

    const handleAddTask = async (newTask) => {
        setLoading(true)
        const addedTask = await addTask(newTask)
        selectedCategory != null & selectedCategory != addedTask.category
            ? setTasks((prevTasks) => [...prevTasks])
            : setTasks((prevTasks) => sortBy === 'oldToNew' ? [...prevTasks, addedTask] : [addedTask, ...prevTasks])
        const tasksData = await getTasks({ sortBy })
        setAllTasks(tasksData)
        setLoading(false)
    }

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId)
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
        const tasksData = await getTasks({ sortBy })
        setAllTasks(tasksData)
    }

    const handleToggleTask = async (taskId, isCompleted) => {
        await completeTask(taskId, !isCompleted)
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        )
    }

    const handleTaskDetails = (taskId) => {
        const task = tasks.find((t) => t.id === taskId)
        navigation.navigate('Task Details', { 
            taskId,
            onUpdateTask: async () => {
                setLoading(true)
                const tasksData = await getTasks()
                setTasks(tasksData)
                setLoading(false)
            }
        })
    }

    const handleSortChange = () => {
        setSortBy(sortBy === 'oldToNew' ? 'newToOld' : 'oldToNew');
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator style={styles.loading} size='large' color='#000' />
            ) : allTasks.length === 0 ? (
                <View style={styles.emptyTasksContainer}>
                    <Text style={styles.emptyTasksText}>You have no tasks!</Text>
                    <TouchableOpacity
                        style={styles.addButtonRectangle}
                        onPress={() => {
                            navigation.navigate('Add Task', { onAddTask: handleAddTask, allTasks, setTasks })
                        }}
                    >
                        <Text style={styles.addButtonRectangleText}>Click here to add a new one</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.filterContainer}>
                            <RNPickerSelect 
                                onValueChange={(value) => setSelectedCategory(value)}
                                items={categories.map((category) => ({ label: category, value: category }))}
                                style={pickerSelectStyles}
                                placeholder={{
                                    label: 'All Tasks',
                                    value: null,
                                }}
                                value={selectedCategory}
                            />
                        </View>
                        <TouchableOpacity style={styles.sortButton} onPress={handleSortChange}>
                            <Text style={styles.sortButtonText}>
                                {sortBy === 'oldToNew' ? 'Sort: Old to New' : 'Sort: New to Old'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} onTaskDetails={handleTaskDetails} />
                    <TouchableOpacity 
                        style={styles.addButtonCircle}
                        onPress={() => {
                            navigation.navigate('Add Task', { onAddTask: handleAddTask, tasks, setTasks, selectedCategory })
                        }}
                    >
                        <Text style={styles.addButtonCircleText}>+</Text>
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
    emptyTasksContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTasksText: {
        fontSize: 18,
        color: '#555',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    filterContainer: {
        flex: 1,
    },
    sortButton: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sortButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButtonRectangle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffefef',
        borderColor: '#000',
        // borderRadius: 12,
        margin: 12,
        padding: 12,
    },
    addButtonRectangleText: {
        fontSize: 20,
        color: '#009900',
    },
    addButtonCircle: {
        position: 'absolute',
        bottom: 48,
        right: 40,
        backgroundColor: '#000',
        borderRadius: 50,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonCircleText: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        color: '#000',
        fontWeight: 'bold',
        paddingRight: 30,
        textAlign: 'center',
    },
    inputAndroid: {
        fontSize: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderWidth: 0.5,
        borderColor: '#000',
        color: '#000',
        paddingRight: 30,
        textAlign: 'center',
    },
})

export default TaskListScreen;