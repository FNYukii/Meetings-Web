import ProgressImage from "../images/ProgressImage";

export default function SubmitButton(props: { text: string, isLoading: boolean, disabled: boolean }) {

    return (
        <div>

            {!props.isLoading &&
                <button type="submit" disabled={props.disabled} className={`font-bold p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 ${props.disabled ? "text-gray-400 dark:text-gray-600 hover:bg-transparent dark:hover:bg-transparent" : ""}`}>
                    {props.text}
                </button>
            }

            {props.isLoading &&
                <ProgressImage className="mr-3" />
            }
        </div>
    )
}