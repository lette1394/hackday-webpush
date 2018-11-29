export enum NotificationImportance {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT"
}

export enum NotificationTarget {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM"
}

export interface Notification {
  key: string;
  importance: NotificationImportance;
  title: string;
  message: string;
  createAt: Date;
}
