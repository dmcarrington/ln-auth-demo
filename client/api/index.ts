import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

type ServerError = {
  error: string;
  msg: string;
  data: any;
};

export const loginWithLN = async (): Promise<any> => {
  try {
    const response = await axios.get('user/login-lnurl');
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
  }
}

export const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY
export const pusherChannel = process.env.NEXT_PUBLIC_PUSHER_CHANNEL
export const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER