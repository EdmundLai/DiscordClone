import React, { useState } from "react";
import Modal from "react-modal";
import ModalTopBar from "../ModalTopBar/ModalTopBar";
import { SettingOutlined } from "@ant-design/icons";

import { Button } from "antd";

import EditServerNameContainer from "../EditServerNameContainer/EditServerNameContainer";

import "./ServerSettingsHeader.css";

var requestController = require("../../api/requestController");

function ServerSettingsHeader(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const customStyles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
        content: {
            top: "20%",
            left: "20%",
            right: "20%",
            bottom: "20%",
            background: "#36393f",
            border: "none",
            color: "#ffffff"
        },
    };

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function openServerSettingsModal() {
        console.log(
            `Opening server settings for ${props.currentServer.serverName}`
        );
        openModal();
    }

    return (
        <div className="ServerSettingsHeader">
            <h3 className="ServerSettingsHeaderName">{props.currentServer.serverName}</h3>
            <div className="ServerSettingsButton">
                <SettingOutlined onClick={openServerSettingsModal} />
            </div>
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <ServerSettingsModalContent
                    {...props}
                    closeModal={closeModal}
                />
            </Modal>
        </div>
    );
}

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

function DeleteServerContainer(props) {
    async function deleteServer() {
        // implement deleting server here
        await requestController.deleteServer(props.currentServer.serverId)

        props.setServerListNeedsUpdate(true);
        props.setCurrentServerAndChannel();

        console.log("Server deleted!");
        props.closeModal();
    }

    console.log(props);

    return (
        <div>
            <h4 className="ServerSettingsHeaderName">Delete Server</h4>
            <p>Do you really want to delete the server {props.currentServer.serverName}?</p>
            <div className="ModalSubmitContainer">
                <Button type="danger" onClick={deleteServer}>Confirm</Button>
            </div>
        </div>
    );
}


export default ServerSettingsHeader;
