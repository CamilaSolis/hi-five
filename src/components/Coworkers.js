import React from 'react';
import Popup from "reactjs-popup";
import { FaSmileBeam} from "react-icons/fa";

export default class Coworkers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    fetch("https://api.randomuser.me/?results=10")
    .then(res => res.json())
    .then(workers => {
      this.setState({
        isLoading: true,
        items: workers.results,
      })
    })
  }

  render() {
      let { isLoading, items } = this.state;
      
      let audio = new Audio("/yay.mp3")

      const start = () => {
        audio.play()
      }

      if(!isLoading){
        return(
          <div>
            Cargando a tus compañeros...
          </div>
        )
      } else {
        return(
          <div className="columns is-multiline is-desktop">
            {items.map(item => (
              <div className="column is-one-quarter"  key={item.login.uuid}>
                <div className="box has-text-centered">
                  <figure className="image is-128x128">
                    <img className="is-rounded" src={item.picture.large} />
                  </figure>
                   <div className="field">
                    <p className="is-size-5 mt-15 mb-15">{item.name.first}{" "}{item.name.last}</p>
                    </div>
                    <Popup
                      trigger={<button className="button is-primary is-outlined"> Ver más </button>}
                      modal
                      closeOnDocumentClick
                    >
                      <div className="columns">
                        <div className="column">
                          <figure className="image is-128x128">
                            <img className="is-rounded" src={item.picture.large} />
                          </figure>
                          <p>{item.name.first}{" "}{item.name.last}</p>
                        </div>
                        <div className="column is-7-tablet is-8-desktop is-3-widescreen has-text-left">
                          <p className="has-text-center is-size-4">{item.name.first}{" "}{item.name.last}</p>
                          <p>Ciudad: {item.location.city}</p>
                          <p>Edad: {item.dob.age}</p>
                          <p>Cumpleaños: {item.dob.date}</p>
                          <p>Email: {item.email}</p>
                          <p>Celular: {item.cell}</p>
                          <button className="button is-success is-light mt-15 yay-button" onClick={start}>
                            <FaSmileBeam />
                              Hi-Five?
                          </button>
                        </div>
                      </div>
                    </Popup>
                </div>

              </div>
            ))}
          </div>
        )
      }
  }
}


  //   const url = "https://api.randomuser.me/?results=10"
