import React from 'react';
import "./styles.css"
import { Button, Grid } from '@material-ui/core';
import OrderDetails from './OrderDetails/OrderDetails';

const Orders = () => {
  return (
    <div container>
      <div className='header-container'>
              <Grid className='container-grid'>
                  <Grid className='order-tracking'>
                      Orders {">"} <u>Orders#32421</u>
                  </Grid>
                  <br />
                  <Grid xs={12} className='order-number-container-grid'>
                  <Grid item xs={3} className='order-number'>
                      ORDER #32421
                  </Grid>
                  <Grid xs={5}></Grid>
                  <Grid item xs={4} className='button-grid'>
                          <Button variant="outlined" className='back-button' size='small'>
                              Back
                          </Button>
                          <Button variant="contained" className='approve-button' size ='small'>
                              Approve Order
                          </Button>
                  </Grid>
                  </Grid>
              </Grid>
              
      </div>
      <OrderDetails/>
    </div>
  );
};

export default Orders;
