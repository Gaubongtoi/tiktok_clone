import { useState, useEffect } from 'react';

// custom Hook
function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(handler);
    }, [value]);
    return debounceValue;
}

export default useDebounce;
