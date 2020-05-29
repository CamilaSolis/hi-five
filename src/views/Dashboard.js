
import React, { useEffect, useContext ,useState} from "react";
import Header from "../components/Header";
import Coworkers from "../components/Coworkers";
import { Auth } from "../context/AuthContext";
import { withRouter } from "react-router";

const Dashboard=({history}) =>{
  const { usuario } = useContext(Auth);
  const [nombre, setnombre] = useState(null)

  useEffect(() => {
    if (usuario===null) {
      history.push("/login");
    }
    usuario?usuario.displayName?setnombre(usuario.displayName):setnombre(usuario.email.split('@')[0]):setnombre(null)
    }, [history, usuario]);

  return (
    <section>
      <Header />
      <div className="hero-body is-fullheight is-mt70">
        <div className="container">
            <h1 className="title is-1 has-text-centered">¡Hola {nombre}! </h1>
            <h2 className="subtitle is-4 has-text-centered">Estos son los compañeros a los puedes hacerle ¡HI-FIVE!</h2>
            <Coworkers />
        </div>
      </div>
    </section>
  );
}
export default withRouter(Dashboard);