import BackButton from "../buttons/BackButton"

function TitleBar(props: { justifyBetween?: boolean, showBackButton?: boolean, children?: JSX.Element | JSX.Element[] }) {

    return (
        <div className='sticky top-0 z-20'>
            <div className='relative h-14 flex items-center bg-white/70 dark:bg-black/70 backdrop-blur'>

                <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                <div className={`w-full flex items-center`}>

                    {props.showBackButton &&
                        <BackButton className="ml-1"/>
                    }

                    <div className={`w-full flex items-center ${props.justifyBetween ? "justify-between" : ""}`}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TitleBar