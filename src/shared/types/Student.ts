export interface Student {
  id: number;
  name: string;
  grade: number;
  attend: "none" | "late" | "present";
}