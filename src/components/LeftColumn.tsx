import styled from 'styled-components'

export default function LeftColumn() {

    const Root = styled.div`
        width: 25%;
        border: 1px solid gray;
    `

    return (
        <Root>
            <p>Side Bar</p>
        </Root>
    )
}