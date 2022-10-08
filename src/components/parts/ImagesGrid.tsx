export default function ImagesGrid(props: { imageUrls: string[] }) {
    return (
        <div>
            {props.imageUrls.length === 1 &&
                <div className="mt-2 h-80">
                    <img src={props.imageUrls[0]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                </div>
            }

            {props.imageUrls.length === 2 &&
                <div className="mt-2 flex h-80">
                    <div className="w-1/2 h-full pr-1">
                        <img src={props.imageUrls[0]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                    </div>

                    <div className="w-1/2 h-full pl-1">
                        <img src={props.imageUrls[1]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                    </div>
                </div>
            }

            {props.imageUrls.length === 3 &&
                <div className="mt-2 flex h-80">

                    <div className="w-1/2 h-full pr-1">
                        <img src={props.imageUrls[0]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                    </div>

                    <div className="w-1/2 h-full pl-1">
                        <div className="h-1/2 pb-1">
                            <img src={props.imageUrls[1]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                        </div>

                        <div className="h-1/2 pt-1">
                            <img src={props.imageUrls[1]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                        </div>
                    </div>
                </div>
            }

            {props.imageUrls.length === 4 &&
                <div className="mt-2 flex h-80">

                    <div className="w-1/2 h-full pr-1">
                        <div className="h-1/2 pb-1">
                            <img src={props.imageUrls[0]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                        </div>

                        <div className="h-1/2 pt-1">
                            <img src={props.imageUrls[1]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                        </div>
                    </div>

                    <div className="w-1/2 h-full pl-1">
                        <div className="h-1/2 pb-1">
                            <img src={props.imageUrls[2]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                        </div>

                        <div className="h-1/2 pt-1">
                            <img src={props.imageUrls[3]} alt="Attached to comment" className="rounded-xl w-full h-full object-cover border border-zinc-200 dark:border-zinc-800" />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}