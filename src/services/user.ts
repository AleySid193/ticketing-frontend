import api from '@/api/api';

//services for normal user
interface DashboardData {
  high: number;
  assigned: number;
  completed: number;
  rejected: number;
}

interface SideBarManager{
    managerName: string;
}

export const getDashboard = async (): Promise<DashboardData> => {
  const { data } = await api.get('/user/get-dashboard');
  return data;
};

export const getSideBarManager = async (): Promise<SideBarManager> => {
  const { data } = await api.get('/user/get-sidebar-manager');
  return data;
};