import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";

import ServerItem from "../ServerItem/ServerItem";
import ServerModalContent from "../ServerModalContent/ServerModalContent";

import "./ServerSidebar.css";

var requestController = require("../../api/requestController");

function ServerSidebar(props) {
    const [servers, setServers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const getServers = async () => {
            const serverData = await requestController.getServers();
            if (isMounted) {
                setServers(serverData);
            }
        };

        getServers();
        props.setServerListNeedsUpdate(false);

        return () => { isMounted = false;}
    }, [props]);

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
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "#36393f",
            border: "none",
            color: "#ffffff",
        },
    };

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function resetServer() {
        props.setCurrentServerAndChannel();
    }

    const serverHomeCssClass =
        props.currentServer == null ? "SelectedServer ServerHome" : "ServerHome";

    return (
        <div className="ServerSidebar">
            <div onClick={resetServer} className={serverHomeCssClass}>
                <HomeOutlined />
            </div>
            {servers.map((server) => {
                return (
                    <ServerItem
                        selectedServer={props.currentServer}
                        key={server.serverId}
                        server={server}
                        setCurrentServerAndChannel={props.setCurrentServerAndChannel}
                    />
                );
            })}
            <div onClick={openModal} className="NewServerButton">
                <PlusOutlined />
            </div>
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <ServerModalContent
                    setCurrentServerAndChannel={props.setCurrentServerAndChannel}
                    setServerListNeedsUpdate={props.setServerListNeedsUpdate}
                    closeModal={closeModal}
                />
            </Modal>
        </div>
    );
}

export default ServerSidebar;
