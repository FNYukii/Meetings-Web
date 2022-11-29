function MyBox(props: {children: JSX.Element, className?: string}) {

    return (
        <div className={`border ${props.className}`}>
            {props.children}
        </div>
    )
}

export default MyBox