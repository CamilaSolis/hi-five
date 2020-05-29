import React, { useState, useContext, useEffect } from "react";
import logoBig from "./../img/logo-big.png";
import { FaUserAlt, FaLock } from "react-icons/fa";
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
            <div className="column is-8-tablet is-9-desktop is-3-widescreen">
              {!signup ? (
              <form className="columns box" onSubmit={correoClave}>
                <div className="column is-one-third">
                  <img className="responsive-logo" src={logoBig} />
                </div>
                <div className="column">
                  <div className="field">
                  <p className="subtitle is-4">Inicia sesión para saber a qué compañeros debes darle un HI-FIVE</p>
                  </div>
                  {error? <div className="field"><Errores mensaje={error}/></div>:null}
                  <div className="field">
                    <div className="control has-icons-left has-icons-right">
                      <input className="input" type="text" name="usuario" placeholder="E-mail de Usuario" />
                      <span className="icon is-small is-left">
                        <FaUserAlt />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-left has-icons-right">
                      <input className="input" type="password" name="clave" placeholder="Clave" />
                      <span className="icon is-small is-left">
                        <FaLock />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <button className="button is-primary is-fullwidth">
                      Ingresa
                    </button>
                  </div>
                  <div className="field">
                    <button onClick={() => setsignup(true)} className="button is-primary is-fullwidth">
                      Regístrate Ahora!
                    </button>
                  </div>
                  <div className="field">
                    <button className="button is-primary is-danger is-fullwidth" onClick={() => socialLogin(googleAuthProvider)}>
                        Inicia sesión con Google
                    </button>
                  </div>
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
