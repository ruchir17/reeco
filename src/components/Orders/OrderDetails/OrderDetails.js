import React, { useEffect, useState } from 'react';
import "./styles.css"
import OrderDetailsHeader from './OrderDetailsHeader/OrderDetailsHeader';
import MaterialTable, { MTableToolbar } from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import tableIcons from '../../materialTableIcons';
import { Check, Clear, Edit, PrintSharp } from '@material-ui/icons';
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import StatusButton from '../../StatusButton/StatusButton';
import { fetchData, updatePriceAndQuantity, updateUserName } from '../../../api/getOrdersData';


const OrderDetails = () => {
    const defaultMaterialTheme = createTheme();
    const [tableData, setTableData] = useState([])
    const [isClearDialogOpen, setClearDialogOpen] = useState(false);
    const [selectedName, setSelectedName] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [editedPrice, setEditedPrice] = useState('');
    const [editedQuantity, setEditedQuantity] = useState('');


    const columnsData = [
        {
            title: "",
            field: "image",
            width: "5%",
            render: rowData => (
                <img src={rowData.image} />

            )

        },
        {
            title: "Product Name",
            field: "name",
            width: "35%"

        },
        {
            title: "Brand",
            field: "brand",
            width: "10%"

        },
        {
            title: "Quantity",
            field: "quantity",
            width: "10%"

        },
        {
            title: "Price",
            field: "price",
            width: "10%"

        },
        {
            title: "Total",
            field: "total",
            width: "10%",
            render: rowData => (
                <div>{(rowData.price * rowData.quantity)}</div>

            )

        },
        {
            title: "Status",
            field: "status",
            width: "20%",
            render: rowData => (
                rowData.status &&
                <StatusButton
                    statusType={getStatusTypeForOrder(rowData.status)}
                    status={rowData.status}
                />
            )
        }
    ]

    useEffect(() => {
        fetchData().then(data => setTableData(data));
    }, [])


    const handleUpdateStatus = async (userId, newStatus) => {
        try {
            // Simulate updating the name on the server
            await updateUserName(userId, newStatus);

            // After updating, fetch the latest data
            const updatedData = await fetchData();
            setTableData(updatedData);
        } catch (error) {
            // Handle the error or log it as needed
        }
    };

    const handlePriceAndQuantityUpdate = async (id, price, quantity) => {
        try {
            // Simulate updating the name on the server
            await updatePriceAndQuantity(id, price, quantity);

            // After updating, fetch the latest data
            const updatedData = await fetchData();
            setTableData(updatedData);
        } catch (error) {
            // Handle the error or log it as needed
        }
    };

    const handleClearSelection = (rowData) => {
        setSelectedName(rowData.name);
        setSelectedId(rowData.id);
        setClearDialogOpen(true);

    };

    const handleClearConfirmed = () => {
        setClearDialogOpen(false);
        handleUpdateStatus(selectedId, "MISSING-URGENT")
    };

    const handleClearCanceled = () => {
        setClearDialogOpen(false);
        handleUpdateStatus(selectedId, "MISSING")
    };

    const handleEditOpen = (rowData) => {
        setSelectedName(rowData.name);
        setSelectedId(rowData.id);
        setEditedPrice(rowData.price.toString());
        setEditedQuantity(rowData.quantity.toString());
        setEditDialogOpen(true);
    };

    const handleEditConfirmed = () => {
        // Implement logic to update price and quantity for the selected row
        // For demonstration, we will log the updated values
        console.log('Updated Price:', editedPrice);
        console.log('Updated Quantity:', editedQuantity);
        handlePriceAndQuantityUpdate(selectedId, editedPrice, editedQuantity)

        // Close the edit dialog
        setEditDialogOpen(false);
    };

    const handleEditCanceled = () => {
        // Close the edit dialog without making any changes
        setEditDialogOpen(false);
    };


    const getStatusTypeForOrder = (orderStatus) => {
        switch (orderStatus) {
            case "MISSING":
                return 'orange'
                break;
            case "MISSING-URGENT":
                return 'red'
                break;
            default:
                return 'green'
                break;
        }
    }



    return (
        <div className='orderDetails-container'>
            <OrderDetailsHeader />
            <div className='tableWrapper' style={{ width: "100%", marginTop: "5px" }}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        columns={columnsData}
                        data={tableData}
                        icons={tableIcons}
                        title={""}
                        //onSelectionChange={(rows) => handleRowSelection(rows)}
                        options={{
                            search: true,
                            sorting: true,
                            paging: false,
                            //selection : true,
                            headerStyle: {
                                fontWeight: "bold",
                                fontSize: 11
                            },
                            searchFieldStyle: {
                                color: 'black',
                                backgroundColor: "white",
                            },
                            searchFieldAlignment: "left",
                            actionsColumnIndex: -1,

                        }}
                        localization={
                            {
                                header: {
                                    actions: ""
                                }
                            }
                        }
                        actions={[
                            {
                                icon: () => <Check fontSize='small' />,
                                tooltip: 'Confirm',
                                onClick: (event, rowData) => handleUpdateStatus(rowData.id, "APPROVED")
                            },
                            {
                                icon: () => <Clear fontSize='small' />,
                                tooltip: 'Clear',
                                onClick: (event, rowData) => handleClearSelection(rowData)
                            },
                            {
                                icon: () => <Edit fontSize='small' />,
                                tooltip: 'Edit',
                                onClick: (event, rowData) => handleEditOpen(rowData)
                            }
                        ]}
                        components={
                            {
                                Toolbar: props => {
                                    return (

                                        <Grid style={{ display: "flex", alignItems: "center" }}>
                                            <Grid item xs={5}>
                                                <MTableToolbar {...props} />
                                            </Grid>
                                            <Grid item xs={4}>
                                            </Grid>
                                            <Grid item xs={3} style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                                <Button variant="outlined" className='back-button' size='small'>Add Item</Button>
                                                <PrintSharp />
                                            </Grid>
                                        </Grid>
                                    )
                                }
                            }
                        }
                    >

                    </MaterialTable>
                </ThemeProvider>
            </div>
            {/* Clear Confirmation Dialog */}
            <Dialog open={isClearDialogOpen} onClose={handleClearCanceled}>
                <DialogTitle>Missing Product</DialogTitle>
                <DialogContent>
                    is {selectedName} needs to marked MISSING-URGENT?
                </DialogContent>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
                    <Button onClick={handleClearCanceled} >
                        No
                    </Button>
                    <Button onClick={handleClearConfirmed} >
                        Yes
                    </Button>
                </div>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onClose={handleEditCanceled}>
                <DialogTitle>{selectedName}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Price"
                        type="number"
                        value={editedPrice}
                        onChange={(e) => e.target.value >= 0 && setEditedPrice(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        value={editedQuantity}
                        onChange={(e) => (e.target.value >= 0) && setEditedQuantity(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <div>Total : {editedPrice * editedQuantity}</div>
                </DialogContent>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
                    <Button onClick={handleEditCanceled} style={{ color: "green !important" }}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleEditConfirmed} className="approve-button" >
                        Send
                    </Button>
                </div>
            </Dialog>

        </div>
    );
};

export default OrderDetails;
