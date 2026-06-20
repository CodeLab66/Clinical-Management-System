import { mockDashboard } from "@/data/mockDashboard";
import { delay } from "@/services/mockService";

export const dashboardService = {
  getDashboardMetrics() {
    return delay(mockDashboard.kpiMetrics);
  },

  getRevenueTrend() {
    return delay(mockDashboard.revenueTrend);
  },

  getWeeklyClinicActivity() {
    return delay(mockDashboard.weeklyClinicActivity);
  },

  getServiceBreakdown() {
    return delay(mockDashboard.serviceBreakdown);
  },

  getBranchPerformance() {
    return delay(mockDashboard.branchPerformance);
  },

  getWorkflowSummary() {
    return delay(mockDashboard.workflowSummary);
  },

  getReminders() {
    return delay(mockDashboard.reminders);
  },

  getTodayAppointments() {
    return delay(mockDashboard.todayAppointments);
  },

  getPendingTasks() {
    return delay(mockDashboard.pendingTasks);
  },

  getInventorySnapshot() {
    return delay(mockDashboard.inventorySnapshot);
  },

  getCriticalCases() {
    return delay(mockDashboard.criticalCases);
  },

  getTopDoctors() {
    return delay(mockDashboard.topDoctors);
  },

  getRecentActivities() {
    return delay(mockDashboard.recentActivities);
  },

  getFollowUpRecallQueue() {
    return delay(mockDashboard.followUpRecallQueue);
  },

  getFinancialOverview() {
    return delay(mockDashboard.financialOverview);
  },
};
