import React from "react";

import { CloseOutlined } from "@ant-design/icons";

function ModalTopBar(props) {
    return (
        <div className="ModalTopBar">
            <h3 className="ModalHeader">{props.title}</h3>
            <CloseOutlined onClick={props.onClick} />
        </div>
    );
}

export default ModalTopBar;