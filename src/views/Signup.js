import React, { useState } from "react";
import app from "../firebaseConfig";
import { FaUserAlt, FaLock } from "react-icons/fa";
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
          if(error.code === "auth/invalid-email"){
            seterror("Su email es incorrecto")
          } else if(error.code === "auth/weak-password"){
            seterror("Su clave debe tener más de 6 caracteres")
          } 
      });
  };
  return (
    <form className="box" onSubmit={handleSignUp}>
      <div className="field">
        <p className="subtitle is-4">¡Estás a un paso de dar HI-FIVES!</p>
      </div>
      {error? <div className="field"><Errores mensaje={error}/></div>:null}
      <div className="field">
        <div className="control has-icons-left has-icons-right">
          <input className="input" type="text" name="usuario" placeholder="Registra un usuario" />
            <span className="icon is-small is-left">
              <FaUserAlt />
            </span>
        </div>
      </div>
      <div className="field">
        <div className="control has-icons-left has-icons-right">
          <input className="input" type="password" name="clave" placeholder="Registra una clave" />
          <span className="icon is-small is-left">
            <FaLock />
          </span>
        </div>
      </div>
      <div className="field">
        <button className="button is-primary is-fullwidth">
            Regístrate!
        </button>
      </div>
      <div className="field">
        <button
            onClick={() => setsignup(false)}
            className="button is-primary is-fullwidth"
        >
            Volver
        </button>
      </div>
    </form>
  );
};

export default withRouter(Signup);
