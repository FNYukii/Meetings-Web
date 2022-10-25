import progress from "../../../images/progress.svg"

export default function ProgressImage(props: {className?: string}) {
    
    return (
        <img src={progress} alt='loading' className={props.className} />
    )
}