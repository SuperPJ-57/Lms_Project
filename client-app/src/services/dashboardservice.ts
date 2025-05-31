import apiClient from './authservice';
import { DashboardData, OverdueBorrower } from '../types/dashboard';

export const getDashboardData = async (username: string | null): Promise<DashboardData> => {
  const response = await apiClient.get(`/dashboard/${username}`);
  return response.data;
};

export const getOverdueBorrowers = async (): Promise<OverdueBorrower[]> => {
  const response = await apiClient.get(`/overdue-borrowers/`);
  return response.data;
};
