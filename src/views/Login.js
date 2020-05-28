import React, { useState, useContext, useEffect } from "react";
import Signup from "./Signup";
import { withRouter } from "react-router";
import * as firebase from "firebase/app";
import app from "../firebaseConfig";
import { Auth } from "../context/AuthContext";
import Errores from '../components/Errores'

const Login = ({ history }) => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  const [signup, setsignup] = useState(false);
  const { usuario } = useContext(Auth);
  const [error, seterror] = useState('');

  useEffect(() => {
    if (usuario) {
      history.push("/");
    }
  }, [history, usuario]);

  const correoClave = async e => {
    e.preventDefault();
    const { usuario, clave } = e.target.elements;

    await app
      .auth()
      .signInWithEmailAndPassword(usuario.value, clave.value)
      .then(result => {
        console.log(result);
        history.push("/");
      })
      .catch(error => {
        seterror(error.message)

        if(error.code === "auth/invalid-email"){
          seterror("Su email es incorrecto")
        } else if(error.code === "auth/wrong-password"){
          seterror("Su clave es incorrecta")
        } else if(error.code === "auth/user-not-found"){
          seterror("Su email no esta registrado")
        }
      });
  };


  const socialLogin = async (provider)=>{
    await app
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      seterror(error.message)
      console.log(error.code)
      if(error.code === "auth/popup-closed-by-user"){
        seterror("Inicio de sesión incompleto")
      }
    });
  }



  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                {!signup ? (
                  <form className="box" onSubmit={correoClave}>
                    <div className="field">
                      <h1>Ingreso</h1>
                    </div>
                    {error? <div className="field"><Errores mensaje={error}/></div>:null}
                    <div className="field">
                      <label className="label">Usuario</label>
                      <div className="control">
                        <input className="input" type="text" name="usuario" placeholder="Usuario" />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input className="input" type="password" name="clave" placeholder="Clave" />
                      </div>
                    </div>
                    <div className="field">
                      <button className="button is-primary is-fullwidth">
                        Ingresa
                      </button>
                      O{" "}
                      <button onClick={() => setsignup(true)} className="button is-primary is-fullwidth">
                          Registrate Ahora!
                      </button>
                    </div>
                    <div className="field">
                      <button className="button is-primary is-fullwidth" onClick={() => socialLogin(googleAuthProvider)}>
                        <span className="icon">
                            <i className="fa fa-google"></i>
                        </span>
                          Google
                      </button>
                    </div>
                  </form>
                ) : (
                  <Signup setsignup={setsignup} />
                )}
            </div>
        </div>
        </div>
        </div>
        </section>
  );
};
export default withRouter(Login);
