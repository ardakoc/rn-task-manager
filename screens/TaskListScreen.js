import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TaskList from "../components/TaskList";
import { LogBox } from "react-native";
import { addTask, deleteTask, getTasks, completeTask } from "../services/TaskService";

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const TaskListScreen = ({ navigation }) => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksData = await getTasks()
            setTasks(tasksData)
        }
        fetchTasks()
    }, [navigation])

    const handleAddTask = async (newTask) => {
        const addedTask = await addTask(newTask)
        setTasks((prevTasks) => [...prevTasks, addedTask])
    }

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId)
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
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
            onUpdateTask: () => {
                const tasksData = getTasks()
                setTasks(tasksData)
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            {tasks.length === 0 ? (
                <View style={styles.emptyTasksContainer}>
                    <Text style={styles.emptyTasksText}>You have no tasks!</Text>
                    <TouchableOpacity
                        style={styles.addButtonRectangle}
                        onPress={() => {
                            navigation.navigate('Add Task', { onAddTask: handleAddTask, tasks, setTasks })
                        }}
                    >
                        <Text style={styles.addButtonRectangleText}>Click here to add a new one</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} onTaskDetails={handleTaskDetails} />
                    <TouchableOpacity 
                        style={styles.addButtonCircle}
                        onPress={() => {
                            navigation.navigate('Add Task', { onAddTask: handleAddTask, tasks, setTasks })
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
    emptyTasksContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTasksText: {
        fontSize: 18,
        color: '#555',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    addButtonRectangle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffefef',
        borderColor: '#000',
        borderRadius: 12,
        margin: 12,
        padding: 12,
    },
    addButtonRectangleText: {
        fontSize: 20,
        color: '#009900',
    },
    addButtonCircle: {
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
    addButtonCircleText: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
    },
})

export default TaskListScreen;