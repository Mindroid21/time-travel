import { googleConfig } from './config/google-config';

const GOOGLE_CONFIG_TOKEN: string = 'GoogleConfigToken';

export const authProviders = [
  {
    provide: GOOGLE_CONFIG_TOKEN,
    useValue: googleConfig
  }
];