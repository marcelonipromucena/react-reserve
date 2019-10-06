import { Button, Segment, Divider } from 'semantic-ui-react';

function CartSummary() {
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total: </strong> $0.00
        <Button
          icon="cart"
          floated="right"
          content="Checkout"
          color="teal"
        ></Button>
      </Segment>
    </>
  );
}

export default CartSummary;
