function MyBox(props: any) {

    return (
        <div className="border">
            {props.children}
        </div>
    )
}

export default MyBox