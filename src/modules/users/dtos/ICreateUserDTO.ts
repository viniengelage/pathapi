interface ICreateUserDTO {
  username: string;
  email: string;
  password: string;
  name: string;
  birthday: Date;
  free_time: Date;
  cellphone: string;
  genre: "male" | "female" | "other";
  id?: string;
  points?: number;
}

export { ICreateUserDTO };
