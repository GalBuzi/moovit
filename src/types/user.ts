export type IUserModel = {
  id?: number;
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  image: string;
  dep_id:number;
}

export type IUsersFilterModel = {
  first_name?: string;
  last_name?: string;
  title?: string;
  email?: string;
  image?: string;
  dep_id?:number;
}