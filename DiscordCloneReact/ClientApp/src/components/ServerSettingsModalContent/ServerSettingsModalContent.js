import React, { useState } from "react";

import ModalTopBar from "../ModalTopBar/ModalTopBar";

import EditServerNameContainer from "../EditServerNameContainer/EditServerNameContainer";

import DeleteServerContainer from "../DeleteServerContainer/DeleteServerContainer";

function ServerSettingsModalContent(props) {
    const [actionType, setActionType] = useState("edit");

    var modalContent = <></>;

    if (actionType === "edit") {
        modalContent = <EditServerNameContainer
            {...props}
        />;
    } else {
        modalContent = <DeleteServerContainer  {...props} />;
    }

    function setToEdit() {
        setActionType("edit");
    }

    function setToDelete() {
        setActionType("delete");
    }

    const editClasses = actionType === "edit" ? "ServerSettingsOption ServerSettingsSelected" : "ServerSettingsOption";

    const deleteClasses = actionType === "delete" ? "ServerSettingsOption ServerSettingsSelected" : "ServerSettingsOption";

    return (

        <div className="ServerSettingsModalContent">
            <ModalTopBar title="Server Settings" onClick={props.closeModal} />
            <div className="ServerSettingsModalContainer">
                <div className="ServerSettingsModalMenu">
                    <div>
                        <span className={editClasses} onClick={setToEdit}>Edit Server</span>
                    </div>
                    <div >
                        <span className={deleteClasses} onClick={setToDelete}>Delete Server</span>
                    </div>
                </div>
                <div className="ServerSettingsModalActionArea">
                    {modalContent}
                </div>
            </div>
        </div>
    );
}

export default ServerSettingsModalContent;
