import BackButton from "../buttons/BackButton"

function TitleBar(props: {children: JSX.Element}) {

    return (
        <div className='sticky top-0 z-20'>
            <div className='relative h-14 pl-3 pr-1 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>

                <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                {props.children}
            </div>
        </div>
    )
}

export default TitleBar