import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { id, title, price, description } = props;

  const addToCartHandler = () => {
    const newTotalQuantity = cart.totalQuantity + 1;

    const updatedItems = cart.items.slice(); // create copy via slice method to avoid mutating the state object
    const existingItem = updatedItems.find((item) => item.id === id);
    if (existingItem) {
      const updatedItem = { ...existingItem }; // new object + copy existing properties
      updatedItem.quantity++;
      updatedItem.price += price;
      const existingItemIndex = updatedItems.findIndex(
        (item) => item.id === id
      );
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        id,
        price,
        quantity: 1,
        totalPrice: price,
        name: title,
      });
    }

    const newCart = {
      totalQuantity: newTotalQuantity,
      items: updatedItems,
    };

    dispatch(cartActions.replaceCart(newCart));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
