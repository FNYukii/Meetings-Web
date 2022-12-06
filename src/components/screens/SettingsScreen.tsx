function SettingsScreen() {

    return (
        <div>
            <div className='sticky top-0 z-20'>
                <div className='relative h-14 pl-1 pr-3 flex items-center justify-between bg-white/70 dark:bg-black/70 backdrop-blur'>
                    <div className='absolute top-0 left-0 w-full h-full cursor-pointer' onClick={() => window.scrollTo(0, 0)}></div>

                    <div className="flex items-center">
                        <span className='font-bold text-lg ml-2'>設定</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SettingsScreen