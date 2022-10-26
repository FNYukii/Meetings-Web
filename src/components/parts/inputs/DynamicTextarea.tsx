export default function DynamicTextarea(props: {value: string, setValue: React.Dispatch<React.SetStateAction<string>>, placeholder?: string, className?: string}) {

    function numberOfRow(value: string){

        let num = value.split('\n').length
        return num
    }

    return (
        <textarea value={props.value} onChange={(e) => props.setValue(e.target.value)} rows={numberOfRow(props.value)}  placeholder={props.placeholder ?? ""} className={`resize-none ${props.className}`}/>
    )
}