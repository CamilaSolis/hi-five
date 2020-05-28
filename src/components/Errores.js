import React from 'react'

export default function Errores({mensaje}) {
    return (
        <div className="notification is-danger is-light">
            {mensaje}
        </div>
    )
}
