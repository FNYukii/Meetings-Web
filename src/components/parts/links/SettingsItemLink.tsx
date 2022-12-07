import { IoIosArrowForward } from "react-icons/io"
import { NavLink } from "react-router-dom"

function SettingsItemLink(props: { title: string, subTitle?: string, to: string, children: JSX.Element }) {

    return (
        <NavLink to={props.to}>

            <div className="p-3 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-900">

                <div className="flex gap-3 items-center">
                    {props.children}

                    <div className="flex flex-col">
                        <span>{props.title}</span>
                        <span className="text-gray-500">{props.subTitle}</span>
                    </div>
                </div>

                <IoIosArrowForward className="text-gray-500 text-1xl" />
            </div>
        </NavLink>
    )
}

export default SettingsItemLink