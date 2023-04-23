import axios, { AxiosHeaders } from 'axios';
import { Config } from 'sst/node/config';
import { Service } from 'typedi';
import { logger } from '../utils';

interface AuthHeaders extends Partial<AxiosHeaders> {
  'x-whiskey-client-id': string;
  'x-whiskey-client-secret': string;
}

@Service()
export class AuthService {
  public async verifyAuthToken(headers: AuthHeaders): Promise<boolean> {
    logger.info('Validating auth token with Auth Service');
    logger.debug('Auth validation headers', { headers });
    logger.debug('Auth validation url', { url: `${Config.AUTH_BASE_URL}/token` });
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
    logger.info('Retrieving user info from Auth Service');
    logger.debug('User info request headers', { headers });
    logger.debug('User info request url', { url: `${Config.AUTH_BASE_URL}/me` });
    const response = await axios.get(`${Config.AUTH_BASE_URL}/me`, {
      headers: headers as AxiosHeaders,
    });
    return response.data;
  }
}
