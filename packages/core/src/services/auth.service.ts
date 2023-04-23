import axios, { AxiosHeaders } from 'axios';
import { Config } from 'sst/node/config';
import { Service } from 'typedi';

interface AuthHeaders extends Partial<AxiosHeaders> {
  'x-whiskey-client-id': string;
  'x-whiskey-client-secret': string;
}

@Service()
export class AuthService {
  public async verifyAuthToken(headers: AuthHeaders): Promise<boolean> {
    try {
      const response = await axios.post(`${Config.AUTH_BASE_URL}/token`, undefined, {
        headers: headers as AxiosHeaders,
      });
      return response.data.success;
    } catch (error) {
      throw {
        status: 401,
        message: 'Error validating auth token',
        details: error,
      };
    }
  }
  public async getUserInfo(headers: AuthHeaders): Promise<{ id: number; [x: string]: any }> {
    const response = await axios.get(`${Config.AUTH_BASE_URL}/me`, {
      headers: headers as AxiosHeaders,
    });
    return response.data;
  }
}
