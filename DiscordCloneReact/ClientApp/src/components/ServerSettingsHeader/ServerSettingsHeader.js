import React, { useState } from "react";

import { useFormik } from "formik";
import Modal from "react-modal";
import { SettingOutlined, CloseOutlined } from "@ant-design/icons";

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
            <h3>{props.currentServer.serverName}</h3>
            <div className="ServerSettingsButton">
                <SettingOutlined onClick={openServerSettingsModal} />
            </div>
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <ServerSettingsModal
                    {...props}
                    closeModal={closeModal}
                />
            </Modal>
        </div>
    );
}

function ServerSettingsModal(props) {
    const [actionType, setActionType] = useState("edit");

    var modalContent = <></>;

    if (actionType === "edit") {
        modalContent = <EditServerNameContainer
            {...props}
        />;
    } else {
        modalContent = <div>Delete Server Content</div>;
    }

    function setToEdit() {
        setActionType("edit");
    }

    function setToDelete() {
        setActionType("delete");
    }

    return (
        <div className="ServerSettingsModal">
            <div className="ServerSettingsModalHeader">
                <CloseOutlined onClick={props.closeModal} />
            </div>
            <div className="ServerSettingsModalContainer">
                <div className="ServerSettingsModalMenu">
                    <div>
                        <span className="ServerSettingsOption" onClick={setToEdit}>Edit Server</span>
                    </div>
                    <div >
                        <span className="ServerSettingsOption" onClick={setToDelete}>Delete Server</span>
                    </div>
                </div>
                <div className="ServerSettingsModalContent">
                    {modalContent}
                </div>
            </div>
        </div>
    );

}

function EditServerNameContainer(props) {

    const formik = useFormik({
        initialValues: { serverName: props.currentServer.serverName },
        onSubmit: async (values, { resetForm }) => {
            //console.log(values.serverName);
            await requestController.editServerName(props.currentServer.serverId, values.serverName);
            props.setCurrentServerAndChannel(props.currentServer.serverId);
            props.setServerListNeedsUpdate(true);
            resetForm();
            props.closeModal();
        },
    });

    return (
        <div className="EditServerNameContainer">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="serverName">Server Name: </label>
                    <input
                        id="serverName"
                        name="serverName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.serverName}
                        required
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default ServerSettingsHeader;
