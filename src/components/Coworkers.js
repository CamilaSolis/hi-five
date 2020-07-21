import React from 'react';
import Popup from "reactjs-popup";
import { FaSmileBeam} from "react-icons/fa";
import Pet from "./Pet";

export default class Coworkers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      changeClass: '',
      hiFive: 0,
    }
  }

  componentDidMount() {
    fetch("https://api.randomuser.me/?results=10")
    .then(res => res.json())
    .then(workers => {
      this.setState({
        isLoading: true,
        items: workers.results,
        changeClass: false,
      })
    })
  }

  render() {
      let { isLoading, items, hiFive } = this.state;
      
      let audio = new Audio("/yay.mp3")

      const start = () => {
        audio.play()
       this.setState({
        hiFive: hiFive + 1,
       })
      }
      console.log( hiFive)
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
                        <div className="column is-4-tablet is-4-desktop is-3-widescreen has-text-left">
                          <p className="has-text-center is-size-4">{item.name.first}{" "}{item.name.last}</p>
                          <p>Ciudad: {item.location.city}</p>
                          <p>Edad: {item.dob.age}</p>
                          <p>Cumpleaños: {item.dob.date.split("T")[0]}</p>
                          <p>Email: {item.email}</p>
                          <p>Celular: {item.cell}</p>
                          <button className="button is-success is-light mt-15 yay-button" onClick={start} disabled={this.state.changeClass}>
                            <FaSmileBeam />
                              Hi-Five?
                          </button>
                          <h4>Con este han sido {hiFive} Hi-Five!!!</h4>
                        </div>
                        <div className="column is-3-tablet is-4-desktop is-3-widescreen has-text-left">
                          <Pet />
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
