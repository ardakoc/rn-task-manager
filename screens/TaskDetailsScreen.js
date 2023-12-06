import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

const TaskDetailsScreen = ({ route, navigation }) => {
    const { task } = route.params
    const [editedTask, setEditedTask] = useState({ ...task })

    const handleSaveChanges = () => {
        // TODO: implement this function
        // with an api call or db update.
        // currently just console.log edited task:
        console.log('updated task:', editedTask)
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.details}>{task.details}</Text> */}
            {/* <Text style={styles.title}>Task Details</Text> */}
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
            {/* İsterseniz daha fazla detay ekleyebilirsiniz, örneğin tamamlanacak tarih, öncelik, vb. */}
            <Button title="Save Changes" onPress={handleSaveChanges} />
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
        color: '#777',
        borderWidth: 1,
        paddingHorizontal: 16,
    },
})

export default TaskDetailsScreen;