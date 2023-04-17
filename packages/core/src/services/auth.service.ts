import axios from 'axios';
import { Config } from 'sst/node/config';
import { Service } from 'typedi';

@Service()
export class AuthService {
  public async verifyAuthToken(authHeader: string): Promise<boolean> {
    try {
      const response = await axios.post(
        `${Config.AUTH_BASE_URL}/token`,
        undefined,
        {
          headers: { Authorization: authHeader },
        }
      );
      return response.data.success;
    } catch (error) {
      throw {
        status: 401,
        message: 'Error validating auth token',
        details: error,
      };
    }
  }
  public async getUserInfo(
    authHeader: string
  ): Promise<{ id: number; [x: string]: any }> {
    const response = await axios.get(`${Config.AUTH_BASE_URL}/me`, {
      headers: { Authorization: authHeader },
    });
    return response.data;
  }
}
