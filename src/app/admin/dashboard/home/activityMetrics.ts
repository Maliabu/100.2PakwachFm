import { Activity } from "../account/page";

const keywords = ['ticket', 'message', 'programming', 'user', 'article', 'profile', 'notification'];

export function getLastLogin(logs: Activity[]): Date | null {
    // EAT time
  const last = logs
    .filter(l => l.activity.activity.includes('Logged in'))
    .map(l => new Date(l.activity.updatedAt))
    .sort((a, b) => b.getTime() - a.getTime())[0];
  return last ?? null;
}

export function getUserKeywordActivityCount(logs: Activity[]): number {
  return logs.filter(
    l => keywords.some(kw => l.activity.activity.toLowerCase().includes(kw))
  ).length;
}

export function estimateSessionTime(logs: Activity[], dayDate: Date = new Date()): number {
  const dayStart = new Date(dayDate);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setHours(23, 59, 59, 999);

  // Filter logs for the given day and relevant login/logout activities
  const dayLogs = logs
    .filter(log => {
      const time = new Date(log.activity.updatedAt);
      return (
        time >= dayStart &&
        time <= dayEnd &&
        (log.activity.activity.includes('Logged in') || log.activity.activity.includes('Logged out'))
      );
    })
    .sort((a, b) => new Date(a.activity.updatedAt).getTime() - new Date(b.activity.updatedAt).getTime());

  let loginTime: Date | null = null;
  let totalMinutes = 0;

  for (const log of dayLogs) {
    const time = new Date(log.activity.updatedAt);

    if (log.activity.activity.includes('Logged in')) {
      if (!loginTime) {
        loginTime = time;
      }
    }

    if (log.activity.activity.includes('Logged out')) {
      if (loginTime) {
        const sessionStart = loginTime < dayStart ? dayStart : loginTime;
        const sessionEnd = time > dayEnd ? dayEnd : time;
        const duration = (sessionEnd.getTime() - sessionStart.getTime()) / (1000 * 60);

        if (duration > 0) {
          totalMinutes += duration;
        }
        loginTime = null;
      }
    }
  }

  // If still logged in (no logout by day end), count till now or day end
  if (loginTime) {
    const now = new Date();
    const sessionStart = loginTime < dayStart ? dayStart : loginTime;
    const sessionEnd = now < dayEnd ? now : dayEnd;
    const duration = (sessionEnd.getTime() - sessionStart.getTime()) / (1000 * 60);

    if (duration > 0) {
      totalMinutes += duration;
    }
  }

  return Math.round(totalMinutes);
}

export function computeUserHealthScore({
  lastLogin,
  sessionMinutes,
  activityCount
}: {
  lastLogin: Date | null;
  sessionMinutes: number;
  activityCount: number;
}): number {
  const now = new Date();
  const daysSinceLogin = lastLogin
    ? (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24)
    : 100;

  const loginScore = daysSinceLogin < 1 ? 1
                   : daysSinceLogin < 3 ? 0.7
                   : daysSinceLogin < 7 ? 0.5
                   : 0.2;

  const activityScore = Math.min(activityCount / 30, 1); // 30 actions = full score
  const timeScore = Math.min(sessionMinutes / 300, 1);   // 5 hours = full score

  const weightedScore = (loginScore * 0.3 + activityScore * 0.4 + timeScore * 0.3);
  return Math.round(weightedScore * 100);
}
