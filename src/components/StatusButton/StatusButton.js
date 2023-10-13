import { Button } from '@material-ui/core';
import React from 'react';

const StatusButton = ({statusType , status}) => {
  return (
    <Button
    variant='contained'
    style={{
        backgroundColor :statusType === 'red' ? 'red' :
        statusType === 'orange' ? 'orange' :
        statusType === 'green' ? 'green' :
        'primary',
        lineHeight : 1,
        color:"white",
        textAlign:"center",
        fontSize : "0.6rem"
    }}
    disabled
    
    >
        {status || ""}
    </Button>
  );
};

export default StatusButton;
