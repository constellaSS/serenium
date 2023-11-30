import './Profile.css'

function Profile() {
    return (
            <div className={"contentWrapper"}>
                <div className={"user"}>
                    <div className={"user-image"}/>
                    <h2 className={"user-name"}>Lou</h2>
                </div>
                <div className="Polkadot">
                </div>
                <div className="logout-button">
                    <button id="logout" className="logout-button1" type="button"/>
                    <h2 className={"user-name"}>Log out</h2>
                </div>
            </div>
    )
}

export default Profile;
