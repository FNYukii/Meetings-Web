import styled from 'styled-components'

export default function CenterColumn() {

    const Root = styled.div`
        width: 50%;
        border: 1px solid gray;
    `

    return (
        <Root>
            <h1>center</h1>
        </Root>
    )
}