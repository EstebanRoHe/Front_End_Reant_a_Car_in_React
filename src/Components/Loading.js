import React from 'react';
import "./Loading.css"
const Loading = () => {
    return (
      
        <div className="loading-container">
        <div className="lds-spinner"><div>
        </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>

        </div>
        <div>
            <h2 style={{color:"white"}}>Cargando...</h2>
        </div>
      
        </div>

       
    );
}

export default Loading;