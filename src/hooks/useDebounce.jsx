import { useEffect, useState } from 'react';

let debounceTimout;

const useDebounce = (value, timeout) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    if (debounceTimout) {
      clearTimeout(debounceTimout);
    }

    debounceTimout = setTimeout(() => {
      setDebouncedValue(value);
    }, timeout);
    return () => {
      clearTimeout(debounceTimout);
    };
  }, [value, timeout]);

  return debouncedValue;
};

export default useDebounce;
