import React from "react";
import app from '../firebaseConfig'

export default function Header({titulo,subtitulo}) {
  return (
    <nav className="navbar has-background-white is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <button onClick={() => app.auth().signOut()} key="logout" className="button is-primary">
              <strong>Cerrar Sesión</strong>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
