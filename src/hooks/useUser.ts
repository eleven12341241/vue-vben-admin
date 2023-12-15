import axios, { AxiosResponse } from 'axios';

interface User {
  id?: number;
  username: string;
  pnone?: string;
  password: string;
  create_by?: Date;
}

interface UserLogin {
  username: string;
  userId: number;
  token: string;
  realName: string;
  desc: string;
  roles: string[];
  code: number;
  data: any;
}

export default function useUser() {
  const register = async (user: User) => {
    const response: AxiosResponse<User> = await axios.post('/api/register', user);
    const userData: User = response.data;
    return userData;
  };

  const getCode = async (phone: string) => {
    const response: AxiosResponse<String> = await axios.get('/api/get_code?phone=' + phone);
    const code = response.data;
    return code;
  };

  const login = async (user: User) => {
    const response: AxiosResponse<UserLogin> = await axios.post('/api/login', user);
    const userData: UserLogin = response.data;
    return userData;
  };

  return {
    register,
    getCode,
    login,
  };
}
