export default function SearchThreadsScreen(props: {keyword: string, className?: string}) {
    
    return (
        <div className={props.className}>
            <p>Search threads by {props.keyword}</p>
        </div>
    )
}