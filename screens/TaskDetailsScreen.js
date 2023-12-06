import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const TaskDetailsScreen = ({ route }) => {
    const { task } = route.params

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.details}>{task.details}</Text>
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
    details: {
        fontSize: 18,
    },
})

export default TaskDetailsScreen;