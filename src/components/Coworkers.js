import React from 'react';
import Popup from "reactjs-popup";

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
      console.log(items)

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
                    <p>{item.name.first}{" "}{item.name.last}</p>
                    <Popup
                      trigger={<button className="button"> Open Modal </button>}
                      modal
                      closeOnDocumentClick
                    >
                      <span> <p>{item.name.first}{" "}{item.name.last}</p> </span>
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
