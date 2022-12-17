function EmailInput(props: { value: string, onChange: React.Dispatch<React.SetStateAction<string>>, placeholder?: string }) {

    return (
        <input
            type="email"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder ?? "メールアドレス"}
            className="mt-5 w-full py-2 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-600"
        />
    )
}

export default EmailInput