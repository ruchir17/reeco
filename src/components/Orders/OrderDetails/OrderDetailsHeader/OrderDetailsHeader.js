import React from 'react';
import { Grid ,Button} from '@material-ui/core';
import "./styles.css"

const OrderDetailsHeader = () => {
  const OrderDetailsHeaderData = [

  { id:1 ,label: "Supplier", text: "East coast Fruits & Vegetables" },
  { id:2 , label: "Shipping Date", text: "Thu, Feb 10" },
  { id:3 ,label: "Total", text: "$15,028.3" },
  { id:4 ,label: "Category", text: "Vegetables" },
  { id:5 ,label: "Department", text: "300-444-678" },
  { id:6 ,label: "Status", text: "Awaiting your approval" },
];

  return (
    <div container>
      <div className='OrderDetailsHeader-container'>
              <Grid className='OrderDetailsHeader-container-grid'  >
                  {/* //<Grid item xs={2}>1</Grid> */}
                  {OrderDetailsHeaderData.map((obj)=> (
                  
                    <Grid className='header-content' item xs={2}>
                    <p className='OrderDetailsHeader-title'key={obj.id}>{obj.label}</p>
                    <p className='OrderDetailsHeader-subtext'>{obj.text}</p>
                    </Grid>
                    
                  ))}
                  
                  {/* <Grid className='header-content' item xs={2}>3</Grid>
                  <Grid className='header-content' item xs={2}>4</Grid>
                  <Grid className='header-content' item xs={2}>5</Grid>
                  <Grid className='header-content' item xs={2}>6</Grid> */}
              </Grid>
              
      </div>
    </div>
  );
};

export default OrderDetailsHeader;
