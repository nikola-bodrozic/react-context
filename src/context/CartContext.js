import React, { Component, createContext } from 'react';

export const CartContext = createContext();

class CartContextProvider extends Component {

  state = {
    numOfPrducts: 0,
    numOfWishes: 0,
    position: [52.2297, 21.0122]
  }

  componentDidMount () {
    setTimeout(() => this.setState({position: [49.2297, 20.0122]}), 5000);
  }

  incrProd = () => {
    this.setState({numOfPrducts: this.state.numOfPrducts+1})
  }

  incrWishs = () => {
    this.setState({numOfWishes: this.state.numOfWishes+1})
  }

  render() { 
    return (
      <CartContext.Provider value={{...this.state, incrProd:this.incrProd, incrWishs:this.incrWishs}}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
 
export default CartContextProvider;