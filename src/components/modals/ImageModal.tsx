export default function ImageModal(props: {className?: string}) {

    return (
        <div className={props.className}>
            <div className="z-30 fixed top-0 left-0 w-full h-full bg-black/30 dark:bg-white/20"></div>
        </div>
    )
}