function TitleBar(props: { children?: JSX.Element | JSX.Element[] }) {

    return (
        <div className='sticky top-0 z-20'>
            <div className='relative h-14 flex items-center bg-white/70 dark:bg-black/70 backdrop-blur'>

                <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                <div className='flex items-center justify-between w-full'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default TitleBar