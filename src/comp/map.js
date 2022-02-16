import React, { Component } from 'react';
import { CartContext } from '../context/CartContext'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

class Map extends Component {
  static contextType = CartContext

  render() {
    return (
      <CartContext.Consumer>
        {(context) => {
          const { numOfPrducts, numOfWishes, position } = this.context;
          return (
            <div className="card">
              <MapContainer
                className="markercluster-map"
                center={[51.0, 19.0]}
                zoom={4}
                maxZoom={18}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} >
                  <Popup>
                    <ul>
                      <li>Your cart has <span data-testid="cart-num-map">{numOfPrducts}</span> items</li>
                      <li>Your wish list has <span data-testid="wish-num-map">{numOfWishes}</span> items</li>
                    </ul>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )
        }
        }
      </CartContext.Consumer>
    );
  }
}

export default Map;
