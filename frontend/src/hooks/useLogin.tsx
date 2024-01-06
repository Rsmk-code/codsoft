import { useAuthContext } from './useAuthContext';
import { useState } from 'react';

interface LoginResult {
    login: (email: string, password: string) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export const useLogin = (): LoginResult => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
            }

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json));
               dispatch({ type: 'login', payload: json });
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setIsLoading(false);
            setError('An error occurred during login.');
        }
    };

    return { login, isLoading, error };
};
