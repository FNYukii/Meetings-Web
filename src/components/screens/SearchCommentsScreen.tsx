export default function SearchCommentsScreen(props: {keyword: string, className?: string}) {
    
    return (
        <div className={props.className}>
            <p>Search comments by {props.keyword}</p>
        </div>
    )
}