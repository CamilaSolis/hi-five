import React from 'react'

export default function Loading() {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="loader is-loading image is-128x128"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
