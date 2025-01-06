export const API_URL = 'http://localhost:3000'
// export const API_URL = 'http://127.0.0.1:3001/'

export const MAX_PAGE_SIZE = 50

import axios from 'axios';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
