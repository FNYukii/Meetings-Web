export default function TitleBar(props: { text: string }) {
    return (
        <div className='p-2 sticky top-0 bg-white/70 dark:bg-black/70 z-20 backdrop-blur mb-1'>
            <span className='font-bold text-lg'>{props.text}</span>
        </div>
    )
}