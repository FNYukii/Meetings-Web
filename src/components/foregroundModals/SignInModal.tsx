import { useState } from "react"
import SignInSection from "../parts/sections/SignInSection"
import SignUpSection from "../parts/sections/SignUpSection"
import FormModal from "../parts/modals/FormModal"

function SignInModal() {

    const [isShowSignUpSection, setIsShowSignUpSection] = useState(false)

    return (
        <FormModal title="サインイン - Meetings">
            <div>
                {!isShowSignUpSection &&
                    <SignInSection setIsShowSignUpSection={setIsShowSignUpSection} />
                }

                {isShowSignUpSection &&
                    <SignUpSection setIsShowSignUpSection={setIsShowSignUpSection} />
                }
            </div>
        </FormModal>
    )
}


export default SignInModal