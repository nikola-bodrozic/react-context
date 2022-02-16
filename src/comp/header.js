import React, { Component } from 'react';
import { CartContext } from '../context/CartContext'
class Navbar extends Component {
  static contextType = CartContext

  render() {
    return (
      <CartContext.Consumer>
        {(context) => {
          const { numOfPrducts,  numOfWishes} = this.context;
          return (
            <nav className="card">
              <ul>
                <li>Your cart has <span data-testid="cart-num">{numOfPrducts}</span> items</li>
                <li>Your wish list has <span data-testid="wish-num">{numOfWishes}</span> items</li>
              </ul>
            </nav>
          )
        }
        }
      </CartContext.Consumer>
    );
  }
}

export default Navbar;