interface IUpdateUserDTO {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  name: string;
  birthday: Date;
  free_time: Date;
  cellphone: string;
  genre: "male" | "female" | "other";
  avatar?: string;
}

export { IUpdateUserDTO };
