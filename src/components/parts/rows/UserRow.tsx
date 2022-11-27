import { NavLink } from "react-router-dom";
import User from "../../../entities/User";
import UserDisplayNameLink from "../links/UserDisplayNameLink";
import UserIcon from "../images/UserIcon";
import UserUserTagLink from "../links/UserUserTagLink";

function UserRow(props: {user: User, className?: string}) {
    return (
        <div className={`flex p-3 relative ${props.className}`}>

            <NavLink to={`/users/${props.user.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-zinc-500/10 dark:hover:bg-zinc-500/20 transition" />

            <UserIcon iconUrl={props.user.iconUrl} className="h-12"/>

            <div className="w-full">

                <div className="ml-3 mr-2 flex justify-between items-center">

                    <div>
                        <UserDisplayNameLink userId={props.user.id} />

                        <UserUserTagLink userId={props.user.id} className="ml-3"/>
                    </div>
                </div>

                <p className="ml-3 mr-3">{props.user.introduction}</p>
            </div>
        </div>
    )
}

export default UserRow