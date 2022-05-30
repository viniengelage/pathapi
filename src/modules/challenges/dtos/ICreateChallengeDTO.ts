export interface ICreateChallengeDTO {
  id?: string;
  title: string;
  description: string;
  content: string;
  earned_points: number;
  icon?: string;
  see_more_url: string;
}
