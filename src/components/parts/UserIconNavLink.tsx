import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utilities/firebase"
import FireUser from "../../utilities/FireUser";
import User from "../../types/User";

export default function UserIconNavLink(props: { userId: string }) {

    const [user, setUser] = useState<User>()

    async function read() {
        const docRef = doc(db, "users", props.userId);
        const docSnap = await getDoc(docRef);

        // 失敗
        if (!docSnap.exists()) {
            
        }

        // 成功
        if (docSnap.exists()) {
            const user = FireUser.toUser(docSnap)
            setUser(user)
        }
    }

    useEffect(() => {
        read()
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <NavLink to='/'>
                <img className="w-12 rounded-full" src={user?.iconUrl} alt="User icon"/>
            </NavLink>
        </div>
    )
}