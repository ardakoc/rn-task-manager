import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TaskList = ({ tasks, onDeleteTask, onToggleTask, onTaskDetails }) => {
    return (
        <FlatList
            data={tasks}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            renderItem={({ item }) => (
                <View style={styles.taskItem}>
                    <TouchableOpacity onPress={() => onToggleTask(item.id)}>
                        <Text style={item.completed ? styles.completedText : null}>{item.title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onTaskDetails(item.id)}>
                        <Text style={styles.detailsButtonText}>Details</Text>
                    </TouchableOpacity>
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
    completedText: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    detailsButtonText: {
      color: '#3498db',
      marginLeft: 8,
    },
})

export default TaskList