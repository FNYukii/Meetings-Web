import progress from "../../../images/progress.svg"

function ProgressImage(props: {className?: string}) {
    
    return (
        <img src={progress} alt='loading' className={props.className} />
    )
}

export default ProgressImage