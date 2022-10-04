import styled from "styled-components"
import Thread from "../../types/Thread"
import ThreadMenu from "./ThreadMenu"
import UserIconNavLink from "./UserIconNavLink"

export default function ThreadRow(props: {thread: Thread}) {

    const Root = styled.div`
        display: flex;
        padding: 8px;
    `

    const TitleSpan = styled.span`
        font-weight: bold;
        margin-left: 8px;
    `

    return (
        <Root>
            <UserIconNavLink userId={props.thread.userId}/>

            <div>
                <TitleSpan>{props.thread.title}</TitleSpan>
                <ThreadMenu thread={props.thread}/>

            </div>
        </Root>
    )
}