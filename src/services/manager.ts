import api from '@/api/api';

export interface DashboardStats {
  myResources: number;
}

interface TaskPayload {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  points: number;
}

interface ViewTasks {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  points: number;
}

interface BulkCreateTasksPayload {
  tasks: TaskPayload[];
}

interface BulkViewTasksPayload {
  tasks: ViewTasks[];
  deletedTasksIds: number[];
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

export const getViewTasks = async (): Promise<ViewTasks[]> => {
  const { data } = await api.get('/manager/get-view-tasks');
  return data;
};

export const updateViewTasks = async (payload: BulkViewTasksPayload) => {
  try{
    await api.post('/manager/update-view-tasks', payload);
  }
  catch(err: any){
    console.log("Api Error: ", err.message);
  }
  finally{
      console.log("View Tasks Payload", payload);
  }
};