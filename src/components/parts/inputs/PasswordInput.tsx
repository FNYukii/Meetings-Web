import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

function PasswordInput(props: { value: string, onChange: React.Dispatch<React.SetStateAction<string>>, placeholder?: string, className?: string }) {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
        <div className={`flex items-center ${props.className}`}>

            <input
                type="password"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder={props.placeholder ?? "パスワード"}
                className="w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />

            <button type="button">
                {!isPasswordVisible &&
                    <AiOutlineEye />
                }

                {isPasswordVisible &&
                    <AiOutlineEyeInvisible />
                }
            </button>
        </div>
    )
}

export default PasswordInput