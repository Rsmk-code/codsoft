import { useAuthContext } from './useAuthContext';
import { useState } from 'react';

interface SignupResult {
    signup: (email: string, password: string, fullname: string, username: string) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export const useSignup = (): SignupResult => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();

    const signup = async (email: string, password: string, fullname: string, username: string): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, fullname, username }),
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
            console.error('Error during signup:', error);
            setIsLoading(false);
            setError('An error occurred during signup.');
        }
    };

    return { signup, isLoading, error };
};
