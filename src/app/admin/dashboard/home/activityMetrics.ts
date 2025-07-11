import { Activity } from "../account/page";

const keywords = ['ticket', 'message', 'programming', 'user', 'article', 'profile', 'notification'];

export function getLastLogin(logs: Activity[]): Date | null {
  const last = logs
    .filter(l => l.activity.activity.includes('Logged in'))
    .map(l => new Date(l.activity.createdAt))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  return last ?? null;
}

export function getUserKeywordActivityCount(logs: Activity[]): number {
  return logs.filter(
    l => keywords.some(kw => l.activity.activity.toLowerCase().includes(kw))
  ).length;
}

export function estimateSessionTime(logs: Activity[]): number {
  const sorted = logs
    .sort((a, b) => new Date(a.activity.createdAt).getTime() - new Date(b.activity.createdAt).getTime());

  let loginTime: Date | null = null;
  let totalMinutes = 0;

  for (const log of sorted) {
    const time = new Date(log.activity.createdAt);
    const now = new Date()
    if (log.activity.activity.includes('Logged in')) {
      loginTime = time;
    }
    if (log.activity.activity.includes('Logged out') && loginTime) {
      const duration = (time.getTime() - loginTime.getTime()) / (1000 * 60);
      if (duration > 0) {
        totalMinutes += duration;
      }
      loginTime = null;
    }  
    if (!log.activity.activity.includes('Logged out') && loginTime){
      const duration = (now.getTime() - loginTime.getTime()) / (1000 * 60);
      // why less than 240
      if (duration > 0) {
        totalMinutes += duration;
      }
      loginTime = null;
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
