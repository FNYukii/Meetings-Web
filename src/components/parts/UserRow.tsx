import { NavLink } from "react-router-dom";
import User from "../../types/User";
import UserDisplayNameSpan from "./UserDisplayNameSpan";
import UserIcon from "./UserIcon";
import UserIconNavLink from "./UserIconNavLink";
import UserUserTagSpan from "./UserUserTagSpan";

export default function UserRow(props: {user: User, className?: string}) {
    return (
        <div className={`flex p-3 relative ${props.className}`}>

            <NavLink to={`/users/${props.user.id}`} className="absolute top-0 left-0 w-full h-full hover:bg-zinc-500/10 dark:hover:bg-zinc-500/20" />

            <UserIcon iconUrl={props.user.iconUrl} className="h-12"/>

            <div className="w-full">

                <div className="ml-3 mr-2 flex justify-between items-center">

                    <div>
                        <UserDisplayNameSpan userId={props.user.id} />

                        <UserUserTagSpan userId={props.user.id} className="ml-3"/>
                    </div>
                </div>

                <p className="ml-3 mr-3">{props.user.introduction}</p>
            </div>
        </div>
    )
}