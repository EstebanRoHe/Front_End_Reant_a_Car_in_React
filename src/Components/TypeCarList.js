import React, { useState, useEffect } from "react";
import typeCarServices from "../services/typecarServices";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "./Loading"

const TypeCarList = () => {
    const [TypeCar, setTypeCar] = useState([]);
    const [validate, setValidate] = useState(false);
    let navigate = useNavigate;

    useEffect(() => {
        getList();

    }, []);

    const getList = () => {
        typeCarServices.getAll()
            .then(response => {
                setTypeCar(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const remove = (id_typeCar) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Deseas eliminar este archivo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                typeCarServices.remove(id_typeCar)
                    .then(response => {
                        console.log(response.data);
                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            'Tu archivo ha sido eliminado',
                            'Correctamente'
                        )
                        navigate(getList());
                    })

                swalWithBootstrapButtons.fire(
                    'Error!',
                    'Tu archivo esta ligado a otro, Primero elimine el archivo ligado a este Correctamente'
                )

            } else if (

                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'No se ha eliminado nungun archivo'
                )
            }
        })

    };

    return (
        <div>
            {TypeCar.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Loading />
                    <Link className="btn btn-primary" style={{marginBottom:"50%"}} to={"/TypeCarCreate"}>
                    <i className="bi bi-plus-circle"> Registrar un Tipo de Vehiculo </i>
                    </Link>
                </div>
            ) : (

                <div className="card text bg-light mb-3">
                    <div className="card-header">
                        <Link className="btn btn-secondary"  to={"/TypeCarCreate"}>
                            <i className="bi bi-plus-circle"> Registrar Tipo de Vehiculo </i>

                        </Link>

                    </div>

                    <div className="card-body ">
                        <div className="table-responsive ">
                            <table className="table table-striped border = 1">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Descripción</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {TypeCar && TypeCar.map(
                                        (typecar) => (
                                            <tr key={typecar.id_typeCar}>
                                                <th scope="row">{typecar.id_typeCar}</th>
                                                <td>{typecar.description}</td>

                                                <td>
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                        <Link className="btn btn-secondary" to={"/TypeCarUpDate/" + typecar.id_typeCar}>
                                                            <i className="bi bi-gear"> Actualizar</i>
                                                        </Link>
                                                        <button className="btn btn-danger"
                                                            onClick={() => remove(typecar.id_typeCar)}>
                                                            <i className="bi bi-trash3"> Eliminar</i>
                                                        </button>
                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}
                                </tbody>

                            </table>

                        </div>
                    </div>
                </div>
            )}
        </div>


    );
};

export default TypeCarList;