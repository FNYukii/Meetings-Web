export default function ImagesGrid(props: { imageUrls: string[] }) {
    return (
        <div>
            {props.imageUrls.length === 1 &&
                <div className="mt-2">
                    <img src={props.imageUrls[0]} alt="Attached to comment" className="rounded-xl w-full h-80 object-cover border border-zinc-200 dark:border-zinc-800" />
                </div>
            }

            {props.imageUrls.length === 2 &&
                <div className="mt-2 flex">
                    <div className="w-1/2 pr-1">
                        <img src={props.imageUrls[0]} alt="Attached to comment" className="rounded-xl w-full h-80 object-cover border border-zinc-200 dark:border-zinc-800" />
                    </div>

                    <div className="w-1/2 pl-1">
                        <img src={props.imageUrls[1]} alt="Attached to comment" className="rounded-xl w-full h-80 object-cover border border-zinc-200 dark:border-zinc-800" />
                    </div>
                </div>
            }

            {props.imageUrls.length === 3 &&
                <div></div>
            }

            {props.imageUrls.length === 4 &&
                <div>

                </div>
            }
        </div>
    )
}