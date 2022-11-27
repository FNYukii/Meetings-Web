function UserIcon(props: { iconUrl: string | null, className?: string }) {
    return (
        <div className={`relative aspect-square ${props.className}`}>

            <div className="bg-zinc-200 dark:bg-zinc-800 rounded-full absolute top-0 left-0 w-full h-full"></div>

            {props.iconUrl &&
                <img className="rounded-full absolute top-0 left-0 w-full h-full" src={props.iconUrl} alt="" />
            }
        </div>
    )
}

export default UserIcon