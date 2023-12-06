import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import TaskList from "../components/TaskList";
import { LogBox } from "react-native";
import { addTask, deleteTask, getTasks } from "../services/TaskService";

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
    }, [])

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
        navigation.navigate('Task Details', { task })
    }

    return (
        <SafeAreaView style={styles.container}>
            <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} onTaskDetails={handleTaskDetails} />
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                    navigation.navigate('Add Task', { onAddTask: handleAddTask, tasks, setTasks })
                }}
            >
                <Text style={styles.addButtonText}>+</Text>
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

export default TaskListScreen;