import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import FireUser from "../../utilities/FireUser";
import User from "../../types/User";

export default function UserIconNavLink(props: { userId: string }) {

    const [user, setUser] = useState<User | null>()

    async function read() {
        const user: User | null = await FireUser.readUser(props.userId)
        setUser(user)
    }

    useEffect(() => {
        read()
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <NavLink to={`/users/${props.userId}`} className="hover:opacity-60">
                {user == null &&
                    <div className="w-12 rounded-full"></div>
                }

                {user != null &&
                    <img className="w-12 rounded-full" src={user?.iconUrl} alt="User icon"/>
                }
            </NavLink>
        </div>
    )
}