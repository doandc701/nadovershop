function Cart(cart) {
  this.items = cart.items || {};
  this.totalItems = cart.totalItems || 0;
  this.totalPrice = cart.totalPrice || 0;
  this.size = cart.size;
  // console.log(cart);

  this.add = function (item, id) {
    var cartItem = this.items[id];
    if (!cartItem) {
      cartItem = this.items[id] = { item, quantity: 0, price: 0 };
    }
    cartItem.quantity++;
    cartItem.price = cartItem.item.price * cartItem.quantity;
    this.totalItems++;
    this.totalPrice += parseInt(cartItem.item.price);
    this.size = cartItem.item.size;
    //console.log(cartItem.size);
  };
  this.getItems = function () {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    // console.log("arr",arr);
    return arr;
  };
}

export default Cart;
