export default function SearchResultScreen(props: {keyword: string}) {
    return (
        <div className="p-3">
            <p>{props.keyword} を検索</p>
        </div>
    )
}