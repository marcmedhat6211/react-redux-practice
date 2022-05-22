import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { uiActions } from "./store/ui-slice";
import { sendCartData } from "./store/cart-slice";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true; // this variable is added so the request is not sent once the application loads in useEffect

/**
 * We can use useState here to show some notification or message when the request is sent like isLoading state and isError state
 * but since we have a ui slice, it would be better if we used that to show some message or notification to the user
 */
function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  /**
   * This solution however has a main problem and issue, and it is that the use effect function will run whenever the application starts wich will make the cart in the db gets updated with an empty cart
   */
  useEffect(() => {
    // const sendCartData = async () => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "pending",
    //       title: "Sending...",
    //       message: "Sending Cart Data!",
    //     })
    //   );
    //   const response = await fetch(
    //     "https://react-redux-d9563-default-rtdb.firebaseio.com/cart.json",
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Sending Cart Data Failed!");
    //   }

    //   dispatch(
    //     uiActions.showNotification({
    //       status: "success",
    //       title: "Success!",
    //       message: "Sent Cart Data Successfully!",
    //     })
    //   );
    // };

    if (isInitial) {
      isInitial = false;
      return;
    }

    // sendCartData().catch((error) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "error",
    //       title: "Error!",
    //       message: error.message,
    //     })
    //   );
    // });

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
