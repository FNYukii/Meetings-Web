import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utilities/firebase"
import FireUser from "../../utilities/FireUser";
import styled from "styled-components";


export default function UserIconNavLink(props: { userId: string }) {


    const StyledImg = styled.img`
        width: 50px;
        height: 50px;
        border-radius: 25px;
    `

    const [iconUrl, setIconUrl] = useState("")

    async function read() {
        const docRef = doc(db, "users", props.userId);
        const docSnap = await getDoc(docRef);

        // 失敗
        if (!docSnap.exists()) {
            
        }

        // 成功
        if (docSnap.exists()) {
            const user = FireUser.toUser(docSnap)
            setIconUrl(user.iconUrl)
        }
    }

    useEffect(() => {
        read()
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <NavLink to='/'>
                <StyledImg src={iconUrl} width="100" height="100" alt=""/>
            </NavLink>
        </div>
    )
}