// dashboardLoader.ts
// dashboardLoader.ts
import { getDashboardData } from "../services/dashboardservice";

export const dashboardLoader = async () => {
  const username = sessionStorage.getItem("username");
  if (!username) {
    // Redirect to login if the user is not authenticated
    return { redirect: "/login" };
  }

  const data = await getDashboardData(username);
  return data;
};
