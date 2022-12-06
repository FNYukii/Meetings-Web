import { NavLink } from "react-router-dom";
import User from "../../../entities/User";
import UserDisplayNameLink from "../links/UserDisplayNameLink";
import UserUserTagLink from "../links/UserUserTagLink";
import UserIconLink from "../links/UserIconLink";

function UserRow(props: { user: User, className?: string }) {
    return (
        <NavLink to={`/users/${props.user.id}`} className="dark:hover:bg-gray-500/20 transition">

            <div className={`flex p-3 relative hover:bg-gray-500/10 ${props.className}`}>
                
                <UserIconLink userId={props.user.id}/>

                <div className="w-full">

                    <div className="ml-3 mr-2 flex justify-between items-center">

                        <div>
                            <UserDisplayNameLink userId={props.user.id} />

                            <UserUserTagLink userId={props.user.id} className="ml-3" />
                        </div>
                    </div>

                    <p className="ml-3 mr-3">{props.user.introduction}</p>
                </div>
            </div>

        </NavLink>


    )
}

export default UserRow