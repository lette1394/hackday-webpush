import { UserGrade } from "./User";

export enum NotificationImportance {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT"
}

export interface NotificationInput {
  key: string;
  title: string;
  message: string;
  importance: NotificationImportance;
  userGrades: UserGrade[];
  createAt: Date;
}

export interface Notification extends NotificationInput {}
