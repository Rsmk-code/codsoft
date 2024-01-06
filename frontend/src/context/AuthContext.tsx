import React, { createContext, useEffect, useReducer, ReactNode } from 'react';

interface AuthState {
    user: {
        username: string;
    } | null;
}

interface AuthAction {
    type: string;
    payload?: {
        username?: string;
    };
}

interface AuthContextProps {
    user: any; 
    dispatch: React.Dispatch<AuthAction>;
}

const initialState: AuthState = {
    user: null,
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "login":
            return { user: { ...action.payload!, username: action.payload!.username! } };
        case "logout":
            return { user: null };
        default:
            return state;
    }
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (user) {
            dispatch({ type: 'login', payload: user });
        }
    }, []);

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
