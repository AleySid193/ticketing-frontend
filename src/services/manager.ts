import api from '@/api/api';

export interface DashboardStats {
  myResources: number;
}

// export interface DashboardChart {
//   assigned: number;
//   submitted: number;
//   approved: number;
//   rejected: number;
//   deleted: number;
//   completed: number;
// }

interface TaskPayload {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  points: number;
}

interface BulkCreateTasksPayload {
  tasks: TaskPayload[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get('/manager/dashboard-stats');
  return data;
};

export const bulkCreateTasks = async (payload: BulkCreateTasksPayload) => {
  console.log("Payload", payload);
  const { data } = await api.post('/manager/create-tasks', payload);
  return data; // backend should return { createdCount: number } or similar
};
// export const getDashboardChart = async (): Promise<DashboardChart> => {
//   const { data } = await api.get('/admin/dashboard-chart');
//   return data;
// };