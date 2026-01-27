import api from '@/api/api';

//services for normal user
interface DashboardData {
  high: number;
  assigned: number;
  completed: number;
  rejected: number;
}

interface Tasks{
  id: number;
  title: string;
  description: string;
  points: number;
}

interface AssignedTasks extends Tasks {
  priority: 'high' | 'medium' | 'low';
}

interface TasksStatus extends Tasks {
  status: 'submitted' | 'completed';
}

export const getDashboard = async (): Promise<DashboardData> => {
  const { data } = await api.get('/user/get-dashboard');
  return data;
};

export const getSideBarManager = async (): Promise<{managerName: string}> => {
  const { data } = await api.get('/user/get-sidebar-manager');
  return data;
};

export const getAssignedTasks = async (): Promise<AssignedTasks[]> => {
  const { data } = await api.get('/user/get-assigned-tasks');
  return data;
};

export const submitAssignedTask = async (payload: {id: number}) => {
  try{
    await api.post('/user/submit-assigned-task', payload);
  }
  catch(err: any){
    console.log("Api Error: ", err.message);
  }
  finally{
    console.log(payload);
  }
};

export const getTasksStatus = async (): Promise<TasksStatus[]> => {
  const { data } = await api.get('/user/get-tasks-status');
  return data;
};