import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Eye, ArrowLeft } from 'lucide-react-native';
import { UserLayout } from '@/components/user/UserLayout';
import { getTasksStatus } from '@/services/user';

/* ---------------- TYPES ---------------- */
type Status = 'submitted' | 'completed';

type ApiTask = {
  id: number;
  title: string;
  description: string;
  points: number;
  status: Status;
};

type UiTask = ApiTask & {
  isExpanded: boolean;
};

/* ---------------- SCREEN ---------------- */
export const TasksStatus = () => {
  const [tasks, setTasks] = useState<UiTask[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    const data = await getTasksStatus();

    setTasks(
      data.map(task => ({
        ...task,
        isExpanded: false,
      }))
    );
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const updateTask = (id: number, updater: (t: UiTask) => UiTask) => {
    setTasks(prev => prev.map(t => (t.id === id ? updater(t) : t)));
  };

  const cardBackground = (status: Status) => {
    return status === 'submitted'
      ? 'bg-yellow-200 border shadow-md shadow-yellow-400 border-yellow-600'
      : 'bg-green-200 border border-green-600 shadow-md shadow-green-400';
  };

  if (!loading && tasks.length === 0) {
    return (
      <UserLayout>
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg text-center">
            No submitted or completed tasks.
          </Text>
        </View>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <View className="flex-1 bg-gray-50 p-4">
        {loading && <ActivityIndicator className="mb-4" />}

        <ScrollView>
          {tasks.map(task => (
            <View
              key={task.id}
              className={`rounded-2xl p-4 mb-5 shadow ${cardBackground(task.status)}`}
            >
              {/* COLLAPSED */}
              {!task.isExpanded && (
                <View className="flex-row justify-between items-center">
                  <View>
                    <View className="flex-row items-center mb-1">
                      <Text className="text-base font-medium mr-2">
                        {task.title}
                      </Text>
                    </View>

                    <Text className="text-sm text-gray-600">
                      {task.points} pts • <Text className='font-semibold'>{task.status.toUpperCase()}</Text>
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      updateTask(task.id, t => ({ ...t, isExpanded: true }))
                    }
                  >
                    <Eye size={22} color="black" />
                  </TouchableOpacity>
                </View>
              )}

              {/* EXPANDED */}
              {task.isExpanded && (
                <View>
                  <Text className="text-xl font-semibold mb-2">
                    {task.title}
                  </Text>

                  <Text className="text-gray-700 mb-2">
                    <Text className="font-semibold">Description:</Text>{' '}
                    {task.description}
                  </Text>

                  <Text className="text-gray-700 mb-4">
                    <Text className="font-semibold">Points:</Text>{' '}
                    {task.points}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      updateTask(task.id, t => ({ ...t, isExpanded: false }))
                    }
                    className="self-start px-4 py-2 bg-gray-200 rounded-lg flex-row items-center"
                  >
                    <ArrowLeft size={16} />
                    <Text className="ml-2 font-medium">Close</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </UserLayout>
  );
};
