export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar_url?: string;
  professional: boolean;
  city?: string;
  uf?: string;
  emergency_active: boolean;
  profession_id?: string;
  created_at: Date;
}
