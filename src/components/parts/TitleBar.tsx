export default function TitleBar(props: { text: string }) {
    return (
        <div className='p-2 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-black z-20'>
            <span className='font-bold text-lg'>{props.text}</span>
        </div>
    )
}