import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function UserIconNavLink(props: {userId: string}) {

    const [iconUrl, setIconUrl] = useState("")

    let path = "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"

    return (
        <div>
            <NavLink to='/'>
                <img src={path} width="100" height="100"/>
            </NavLink>
        </div>
    )
}