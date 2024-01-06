import { useAuthContext } from "./useAuthContext";
//import { useWorkoutsContext } from "./useWorkoutsContext";

interface LogoutHook {
    logout: () => void;
}

export const useLogout: () => LogoutHook = () => {
    const { dispatch } = useAuthContext();
    //const { dispatch: workoutsDispatch } = useWorkoutsContext();

    const logout: () => void = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'logout' });
       // workoutsDispatch({ type: 'SET_WORKOUTS', payload: null });
    };

    return { logout };
};
