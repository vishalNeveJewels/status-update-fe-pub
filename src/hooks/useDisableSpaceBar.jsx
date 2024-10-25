import { useEffect } from 'react';

const useDisableSpaceBar = (elementId, inputRef) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
      }
    };

    const inputElement = inputRef?.current || document.getElementById(elementId);

    if (inputElement) {
      inputElement.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [elementId, inputRef]);
};

export default useDisableSpaceBar;
