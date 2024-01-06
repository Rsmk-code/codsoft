import AnimationWrapper from "../common/page-animation"
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from "../hooks/useLogout";

const animationProps = {
    transition: { duration: 0.2 },
    className:  "absolute right-0 z-50"
  };
const UserNavigationPanel = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext();

    const logOutUser = () => {
        logout()
    }
   console.log()

    return (
        <AnimationWrapper
            transition={animationProps.transition}
            className= {animationProps.className}
        >
            <div className="bg-white absolute right-0 border border-grey
            w-60 duration-200">

                <Link to="/editor" className="flex gap-2 link md:hidden
                pl-8 py-4">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>Write</p>
                </Link>
                    <Link to={`/user/${user.username}`} className="link pl-8 py-4">
                        Profile
                    </Link>

                    <Link to={"/dashboard/blogs"} className="link pl-8 py-4">
                        Dashboard
                    </Link>

                    <Link to={"/settings/edit-profile"} className="link pl-8 py-4">
                        Setting
                    </Link>
                    <span className="absolute border-t border-grey w-[100%]">
                    </span>
                    <button className="text-left p-4 hover:bg-grey w-full pl-8
                    py-4" 
                    onClick={logOutUser}
                    >
                        <h1 className="font-bold text-xl mg-1">Log out</h1>
                        <p className="text-dark-grey">@{user.username}</p>
                    </button>
            </div>
        </AnimationWrapper>
    )
}

export default UserNavigationPanel