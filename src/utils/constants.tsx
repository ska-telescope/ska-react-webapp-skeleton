import { env } from '../env';

export const VERSION = process.env.REACT_APP_VERSION;

// Common URLs
export const { NODE_ENV } = process.env;
export const IS_DEV = NODE_ENV !== 'production';
export const USE_LOCAL_DATA = true;
export const MSENTRA_CLIENT_ID = env.REACT_APP_MSENTRA_CLIENT_ID;
export const MSENTRA_TENANT_ID = env.REACT_APP_MSENTRA_TENANT_ID;
export const MSENTRA_REDIRECT_URI = env.REACT_APP_MSENTRA_REDIRECT_URI;

export const ROLES = [
  { label: 'AIV', value: 'aiv' },
  { label: 'Developer', value: 'developer' },
  { label: 'EMS', value: 'ems' },
  { label: 'ITF', value: 'itf' },
  { label: 'Maintainer', value: 'maintainer' },
  { label: 'Operator', value: 'operator' },
  { label: 'Primary Investigator', value: 'pi' },
  { label: 'Co-Investigator', value: 'ci' }
];

export const SPACER_HEADER = 70;
export const SPACER_FOOTER = 0;
export const SPACER = 50;

export const fullHeight = () => `calc(100vh - ${SPACER_HEADER + SPACER_FOOTER + SPACER}px)`;
