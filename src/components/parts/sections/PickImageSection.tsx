import { useState } from "react";

function PickImageSection() {

    const [profileImage, setProfileImage] = useState('default-profile.png');

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return;

        // React.ChangeEvent<HTMLInputElement>よりファイルを取得
        const fileObject = e.target.files[0];
        // オブジェクトURLを生成し、useState()を更新
        setProfileImage(window.URL.createObjectURL(fileObject));
    };

    return (
        <div>
            <img src={profileImage} alt="Icon"/>
            <input type="file" accept="image/*" onChange={onFileInputChange}/>
        </div>
    )
}

export default PickImageSection