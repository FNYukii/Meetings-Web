import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import FireAuth from "../../../utilities/FireAuth";
import { auth } from "../../../utilities/firebase";

export default function NewThreadLink() {

    const [uid, setUid] = useState<string | null>(FireAuth.uidFromLocalStorage())

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {

                const uid = user.uid
                setUid(uid)

            } else {

                setUid(null)
            }
        })
    }, [])

    return (
        <div className="z-10">

            {uid !== null &&

                <Link to={`/new`}>

                    <div className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
                        <AiOutlinePlus className="text-2xl" />
                    </div>
                </Link>
            }
        </div>
    )
}