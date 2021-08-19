import React, { useEffect } from 'react';
//import { useMutation } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      console.log( 'saveOrder():' );
      console.log( JSON.stringify(products) );

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      // setTimeout(() => {
      //   window.location.assign('/');
      // }, 3000);

    }

    saveOrder();
  }, [addOrder]);

  setTimeout(function(){ alert(""); }, 3000);
  window.location.assign('/')

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
