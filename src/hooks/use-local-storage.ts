// Custom hook for using local storage
import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Implement local storage logic here
  const [value, setValue] = useState<T>(initialValue);
  return [value, setValue] as const;
}
