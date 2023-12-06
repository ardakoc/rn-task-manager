import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from './screens/TaskListScreen';
import TaskAddScreen from './screens/TaskAddScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="My Tasks" component={TaskListScreen} />
        <Stack.Screen name="Add Task" component={TaskAddScreen} />
        <Stack.Screen name="Task Details" component={TaskDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}