import React, { useState } from "react";
import UserList from "./UserList";
import './Modal.css'
const ModalListUser = (props) => {
    const {  onClose, handleSelectUser } = props;
    return (
        <div className="modal  modal-right" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        >
                            
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className="modal-body">

                        <UserList
                            hideButtons={true}
                            handleSelectUser={props.handleSelectUser} 
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={onClose}>
                            Cerrar
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalListUser;

