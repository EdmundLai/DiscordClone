import React, { useState } from "react";
import Modal from "react-modal";
import { SettingOutlined } from "@ant-design/icons";
import ServerSettingsModalContent from "../ServerSettingsModalContent/ServerSettingsModalContent";

import "./ServerSettingsHeader.css";

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

export default ServerSettingsHeader;
