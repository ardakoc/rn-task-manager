import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TaskList = ({ tasks, onDeleteTask }) => {
    return (
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.taskItem}>
                    <Text>{item.title}</Text>
                    <TouchableOpacity onPress={() => onDeleteTask(item.id)}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    deleteButtonText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff4500',
        color: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 20,
        height: '100%',
    },
})

export default TaskList