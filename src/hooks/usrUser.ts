import axios, { AxiosResponse } from 'axios';

interface User {
  id: number;
  username: string;
  pnone: string;
  password: string;
  create_by: Date;
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

  return {
    register,
    getCode,
  };
}
