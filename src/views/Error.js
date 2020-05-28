import React from "react";
import { withRouter } from "react-router";

const Error = ({ history }) => {
  const volver=()=>{
    history.push("/");
  }
  return (
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="is-5-tablet is-4-desktop is-3-widescreen has-text-centered">
            <h1 className="is-size-1"> ERROR 404</h1>
            <p>Ups! ha ocurrido un error</p>
            <button onClick={()=>volver()} className="button is-text is-medium">¿Quieres volver?</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Error);