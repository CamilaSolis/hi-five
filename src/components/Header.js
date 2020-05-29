import React from "react";
import app from '../firebaseConfig';
import logo from './../img/logo.png';

export default function Header({titulo,subtitulo}) {
  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
            <img src={logo} width="112" height="28" />
          </a>
        <div className="navbar-item is-pulled-right">
            <button onClick={() => app.auth().signOut()} key="logout" className="button is-primary">
              <strong>Cerrar Sesión</strong>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
