export interface IDateProvider {
  now(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  isBefore(start_date: Date, end_date: Date): boolean;
}
