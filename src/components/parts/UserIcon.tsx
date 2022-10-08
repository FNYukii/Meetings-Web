export default function UserIcon(props: {iconUrl: string}) {
    return (
        <div className="hover:opacity-60 z-10 relative w-20 h-20">

            <div className="bg-zinc-200 dark:bg-zinc-800 rounded-full absolute top-0 left-0 w-full aspect-square"></div>
            
            <img className="rounded-full absolute top-0 left-0 w-full" src={props.iconUrl} alt="" />
        </div>
    )
}