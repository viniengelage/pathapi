export interface ICreateChallengeDTO {
  id?: string;
  title: string;
  description: string;
  content: string;
  is_completed?: boolean;
  earned_points: boolean;
  icon?: string;
  see_more_url: string;
}
