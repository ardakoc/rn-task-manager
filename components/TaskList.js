import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})

const TaskList = ({ tasks }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default TaskList