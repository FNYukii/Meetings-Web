export default function UserIcon(props: {iconUrl: string}) {
    return (
        <div className="relative h-16 aspect-square">

            <div className="bg-zinc-200 dark:bg-zinc-800 rounded-full absolute top-0 left-0 w-full h-full"></div>
            
            <img className="rounded-full absolute top-0 left-0 w-full h-full" src={props.iconUrl} alt="" />
        </div>
    )
}