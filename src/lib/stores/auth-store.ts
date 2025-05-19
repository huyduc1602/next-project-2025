import { create } from 'jotai/vanilla';
import { atomWithStorage } from 'jotai/utils';

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

// Auth state interface
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

// Initial auth state
const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
};

// Create auth atom with persistent storage
export const authAtom = atomWithStorage<AuthState>('auth', initialState);

// Create actions
export const authLogin = (store: ReturnType<typeof create>) => async (email: string, password: string) => {
  const authStore = store.get(authAtom);
  
  // Set loading state
  store.set(authAtom, { ...authStore, isLoading: true, error: null });
  
  try {
    // In a real app, you would make an API call here
    // This is just a mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'user@example.com' && password === 'password') {
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email: 'user@example.com',
        role: 'user',
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Set successful login state
      store.set(authAtom, {
        user: mockUser,
        accessToken: mockToken,
        isLoading: false,
        error: null,
      });
      
      return { success: true };
    } else {
      // Set error state
      store.set(authAtom, {
        ...authStore,
        isLoading: false,
        error: 'Invalid email or password',
      });
      
      return { success: false, error: 'Invalid email or password' };
    }
  } catch (error) {
    // Set error state
    store.set(authAtom, {
      ...authStore,
      isLoading: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    });
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export const authLogout = (store: ReturnType<typeof create>) => async () => {
  // In a real app, you might want to make an API call to invalidate the token
  store.set(authAtom, initialState);
  return { success: true };
};

export const authRefreshToken = (store: ReturnType<typeof create>) => async () => {
  const { accessToken, user } = store.get(authAtom);
  
  if (!accessToken || !user) {
    return { success: false, error: 'No active session' };
  }
  
  // Set loading state
  store.set(authAtom, { ...store.get(authAtom), isLoading: true });
  
  try {
    // In a real app, you would make an API call here
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock refresh token
    const newToken = 'mock-refreshed-jwt-token';
    
    // Update state with new token
    store.set(authAtom, {
      ...store.get(authAtom),
      accessToken: newToken,
      isLoading: false,
    });
    
    return { success: true };
  } catch (error) {
    // Set error state
    store.set(authAtom, {
      ...store.get(authAtom),
      isLoading: false,
      error: error instanceof Error ? error.message : 'Failed to refresh token',
    });
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to refresh token'
    };
  }
};

// Create store with atoms and actions
export const createAuthStore = () => {
  const store = create();
  
  return {
    authAtom,
    login: authLogin(store),
    logout: authLogout(store),
    refreshToken: authRefreshToken(store),
  };
};