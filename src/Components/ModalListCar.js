import React from "react"; 
import CarList from "./CarList";
import './Modal.css'
const ModalListCar = (props) => {
    const {onClose} = props;
 
    return (
        <div className="modal modal-right" tabIndex="-1" role="dialog" style={{ display: "block" }}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                 <h4><i className="bi bi-card-checklist negrita"> Vehículos</i></h4>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div className="modal-body">

                        <CarList
                            hideButtons={true}
                            handleSelectCar={props.handleSelectCar}   
                            errors={props.errors}
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

export default ModalListCar;