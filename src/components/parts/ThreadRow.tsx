import styled from "styled-components"
import Thread from "../../types/Thread"
import CreatedAtSpan from "./CreatedAtSpan"
import ThreadMenu from "./ThreadMenu"
import UserIconNavLink from "./UserIconNavLink"

export default function ThreadRow(props: {thread: Thread}) {

    const Root = styled.div`
        display: flex;
        padding: 8px;
        width: 100%;
    `

    const ContentColumn = styled.div`
        width: 100%;
        padding-left: 8px;
    `

    const TitleRow = styled.div`
        display: flex;
        justify-content: space-between;
    `

    const TitleSpan = styled.span`
        font-weight: bold;
    `

    return (
        <Root>
            <UserIconNavLink userId={props.thread.userId}/>

            <ContentColumn>
                <TitleRow>
                    <TitleSpan>{props.thread.title}</TitleSpan>
                    <ThreadMenu thread={props.thread}/>
                </TitleRow>

                <CreatedAtSpan/>
            </ContentColumn>
        </Root>
    )
}