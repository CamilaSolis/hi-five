import React from 'react';
import { FaHeart} from "react-icons/fa";

export default class Pet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dog: [],
      cat:[],
      mascota: 0,
    }
  }

  componentDidMount() {
    Promise.all([
      fetch("https://dog.ceo/api/breeds/image/random"),
      fetch("https://api.thecatapi.com/v1/images/search?size=full")
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([data1, data2]) => this.setState({
      dog: data1.message,
      cat: data2[0].url
    }))
  }

  render() {
    let { mascota, dog, cat } = this.state;
    let audio = new Audio("/aww.mp3")

      const start = () => {
        audio.play()
      }
    mascota = Math.floor((Math.random() * 10) + 1)
    return(
      <div>
        <p className="has-text-center is-size-4">¡Mira su mascota!</p>
        <img src={mascota > 5 ? dog : cat} />
        <button className="button is-success is-light mt-15 yay-button" onClick={start}>
        <FaHeart />
          AWWW
        </button>
      </div>
    )
      
  }
}