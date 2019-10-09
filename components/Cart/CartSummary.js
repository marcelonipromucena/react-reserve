import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Button, Segment, Divider } from 'semantic-ui-react';
import calculateCartTotal from '../../utils/calculateCartTotal';

function CartSummary({ products, handleCheckout, success }) {
  const [isCartEmpty, setCartEmpty] = React.useState(false);
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total: </strong> ${cartAmount}
        <StripeCheckout
          name="React Reserve"
          amount={stripeAmount}
          image={
            products.length > 0 ? products[0].product.mediaUrl : ''
          }
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey="pk_test_mPH4VsF4iNjkhvMSVunxsYZ200gqeUWdEY"
          token={handleCheckout}
          triggerEvent="onClick"
        >
          <Button
            icon="cart"
            floated="right"
            disabled={isCartEmpty || success}
            content="Checkout"
            color="teal"
          ></Button>
        </StripeCheckout>
      </Segment>
    </>
  );
}

export default CartSummary;
