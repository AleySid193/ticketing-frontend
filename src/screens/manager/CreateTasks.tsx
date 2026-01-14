import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { ManagerLayout } from '@/components/manager/ManagerLayout';
import { Plus } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import { bulkCreateTasks } from '@/services/manager'; // make sure your service exists

type Priority = 'high' | 'medium' | 'low';

interface TaskForm {
  title: string;
  description: string;
  priority: Priority;
  points: number;
}

export const CreateTasks = () => {
  const [tasks, setTasks] = useState<TaskForm[]>([
    { title: '', description: '', priority: 'low', points: 10 },
  ]);
  const [submitting, setSubmitting] = useState(false);

  /** Add new task form */
  const addTaskForm = () => {
    setTasks(prev => [
      ...prev,
      { title: '', description: '', priority: 'medium', points: 10 },
    ]);
  };

  /** Delete a task form (except first) */
  const deleteTaskForm = (index: number) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  /** Update field for a task */
  const updateTaskField = (
    index: number,
    field: keyof TaskForm,
    value: any
  ) => {
    setTasks(prev =>
      prev.map((task, i) => (i === index ? { ...task, [field]: value } : task))
    );
  };

  /** Check if all tasks are valid */
  const allValid = useMemo(() => {
    return tasks.every(
      task =>
        task.title.trim().length > 0 &&
        task.description.trim().length > 0 &&
        task.priority &&
        task.points > 0
    );
  }, [tasks]);

  /** Submit handler */
  const handleSubmit = async () => {
    if (!allValid || submitting) return;

    try {
      setSubmitting(true);

      const payload = {
        tasks: tasks.map(task => ({
          title: task.title.trim(),
          description: task.description.trim(),
          priority: task.priority,
          points: task.points,
        })),
      };

      const result = await bulkCreateTasks(payload);

      Alert.alert(
        'Success',
        `Submitted ${result.createdCount ?? tasks.length} tasks`
      );

      // Reset form
      setTasks([{ title: '', description: '', priority: 'low', points: 10 }]);
    } catch (err: any) {
      console.error(err);
      Alert.alert('Error', err.message || 'Task creation failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ManagerLayout>
      <ScrollView className="flex-1 p-4">
        {tasks.map((task, index) => (
          <View
            key={index} // using index as key since id removed
            className="mb-6 bg-white p-4 rounded-xl border border-gray-200 relative"
          >
            <Text className="font-semibold mb-2">Task {index + 1}</Text>

            {/* Title */}
            <Text className="text-gray-700 font-medium mb-1">Title</Text>
            <TextInput
              placeholder="Title"
              placeholderTextColor="#9CA3AF"
              value={task.title}
              onChangeText={text => updateTaskField(index, 'title', text)}
              className="border border-gray-300 rounded-md p-2 mb-3"
            />

            {/* Description */}
            <Text className="text-gray-700 font-medium mb-1">Description</Text>
            <TextInput
              placeholder="Description"
              placeholderTextColor="#9CA3AF"
              value={task.description}
              onChangeText={text => updateTaskField(index, 'description', text)}
              multiline
              textAlignVertical="top"
              className="border border-gray-300 rounded-md h-28 px-2 mb-3"
            />

            {/* Priority */}
            <Text className="text-gray-700 font-medium mt-3">Priority (Slide to select)</Text>
            <View className="overflow-hidden">
              <Picker
                selectedValue={task.priority}
                onValueChange={val => updateTaskField(index, 'priority', val)}
                itemStyle={{ fontSize: 16, height: 130, color: '#000000'}}
              >
                <Picker.Item label="High" value="high" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Low" value="low" />
              </Picker>
            </View>

            {/* Points */}
            <Text className="text-gray-700 font-medium mt-3">Points (Slide to select)</Text>
            <View className="overflow-hidden">
              <Picker
                selectedValue={task.points}
                onValueChange={val => updateTaskField(index, 'points', val)}
                itemStyle={{ fontSize: 16, height: 130, color: '#000000'}}
              >
                {Array.from({ length: 10 }, (_, i) => (i + 1) * 10).map(val => (
                  <Picker.Item key={val} label={val.toString()} value={val} />
                ))}
              </Picker>
            </View>

            {/* Delete button */}
            {index !== 0 && (
              <TouchableOpacity
                onPress={() => deleteTaskForm(index)}
                className="absolute top-2 right-2 bg-red-500 py-1 px-2 rounded-lg"
              >
                <Text className="text-white font-bold">Delete</Text>
              </TouchableOpacity>
            )}

            {/* Add task (+) button */}
            {index === tasks.length - 1 && (
              <TouchableOpacity
                onPress={addTaskForm}
                className="absolute bottom-2 right-2 bg-green-600 p-3 rounded-full"
              >
                <Plus color="white" size={20} />
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!allValid || submitting}
          className={`mt-4 py-3 rounded-xl ${
            allValid ? 'bg-indigo-600' : 'bg-gray-300'
          }`}
        >
          <Text className="text-white text-center font-semibold">
            {submitting ? 'Submitting...' : 'Submit Tasks'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ManagerLayout>
  );
};
