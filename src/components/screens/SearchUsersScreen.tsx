export default function SearchUsersScreen(props: {keyword: string, className?: string}) {
    
    return (
        <div className={props.className}>
            <p>Search users by {props.keyword}</p>
        </div>
    )
}