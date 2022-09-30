import styled from 'styled-components'

export default function RightColumn() {

    const Root = styled.div`
        width: 25%;
        border: 1px solid gray;
    `

    return (
        <Root>
            <p>Recommendation</p>
        </Root>
    )
}