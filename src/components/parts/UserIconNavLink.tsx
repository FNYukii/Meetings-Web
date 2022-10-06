import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FireUser from "../../utilities/FireUser";
import User from "../../types/User";

export default function UserIconNavLink(props: { userId: string }) {

    const [user, setUser] = useState<User | null>()

    async function read() {
        const user: User | null = await FireUser.readUserFromCache(props.userId)
        setUser(user)
    }

    useEffect(() => {
        read()
        // eslint-disable-next-line
    }, []);

    return (
        <div className="hover:opacity-60 z-10 relative">

            <NavLink to={`/users/${props.userId}`} className="absolute top-0 left-0 w-full h-full"/>

            {user == null &&
                <div className="w-12 rounded-full"></div>
            }

            {user != null &&
                <img className="w-12 rounded-full" src={user?.iconUrl} alt="User icon" />
            }
        </div>
    )
}