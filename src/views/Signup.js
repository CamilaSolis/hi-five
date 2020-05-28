import React, { useState } from "react";
import app from "../firebaseConfig";
import { withRouter } from "react-router";
import Errores from "../components/Errores";

const Signup = ({ setsignup, history }) => {
    const [error, seterror] = useState("");
    const handleSignUp = async e => {
        e.preventDefault();
        const { usuario, clave } = e.target.elements;

        await app
            .auth()
            .createUserWithEmailAndPassword(usuario.value, clave.value)
            .then(result => {
                console.log(result);
                history.push("/");
            })
            .catch(error => {
                seterror(error.message);
            });
    };
    return (
        <form className="box" onSubmit={handleSignUp}>
            <div className="field">
                <h1>Registro</h1>
            </div>
            {error? <div className="field"><Errores mensaje={error}/></div>:null}
            <div className="field">
                <label className="label">Usuario</label>
                <div className="control">
                    <input className="input" type="text" name="usuario" placeholder="Registra un usuario" />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input className="input" type="password" name="clave" placeholder="Registra una clave" />
                </div>
            </div>
            <div className="field">
                <button
                    className="button is-primary is-fullwidth"
                >
                    Registrate
                </button>
                O{" "}
                <button
                    onClick={() => setsignup(false)}
                    className="button is-primary is-fullwidth"
                >
                    Ingresa ahora!
                </button>
            </div>
        </form>
    );
};

export default withRouter(Signup);
