import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_POSITION } from "../utils/mutations";
import { useQuery } from "@apollo/client";
import {
    QUERY_STOCKS,
    QUERY_USER_WATCHLIST
} from "../utils/queries";
import Auth from "../utils/auth";
import { useFormik } from "formik";

/**
 * Renders a form to add a new stock position to the user's watchlist
 * @returns {JSX.Element} The AddStockPosition component
 */
function AddStockPosition() {
    const [open, setOpen] = useState(false);
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [addPosition] = useMutation(ADD_POSITION);
    const { data: userWatchlists } = useQuery(QUERY_USER_WATCHLIST, {
        variables: { user: Auth.getProfile().data._id }
    });

    const watchlistStocks = userWatchlists?.watchlists[0]?.stocks.map(
        (stock) => stock._id
    );

    const { loading, data } = useQuery(QUERY_STOCKS);
    const filteredStocks = data?.stocks.filter((stock) =>
        watchlistStocks.includes(stock._id)
    );

    const formik = useFormik({
        initialValues: {
            symbol: '',
            quantity: '',
            price: ''
        },
        onSubmit: (values) => {
            handleAdd(values);
        },
        validate: (values) => {
            const errors = {};
            if (!values.symbol) {
                errors.symbol = 'Required';
            }
            if (!values.quantity) {
                errors.quantity = 'Required';
            } else if (isNaN(values.quantity)) {
                errors.quantity = 'Must be a numerical value.';
            }
            if (!values.price) {
                errors.price = 'Required';
            } else if (isNaN(values.price)) {
                errors.price = 'Must be a numerical value.';
            }
            return errors;
        },
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (values) => {
		// Use the filteredStocks array to find the stock object that matches the symbol
		const stock = filteredStocks.find(
			(stock) => stock.symbol === values.symbol
		);

		// Add position to the database within a try/catch block
		try {
			addPosition({
				variables: {
					user: Auth.getProfile().data._id,
					stock: stock._id,
					price: parseFloat(values.price),
					quantity: parseInt(values.quantity)
				}
			});
		} catch (err) {
			console.error(err);
		}

		// Clear the form fields
		setSymbol("");
		setQuantity("");
		setPrice("");
		// Close the dialog box
		handleClose();
	};

    if (!filteredStocks) {
        return null;
    }

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
            >
                Add Stock Position
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Add Stock Position</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <Select
                            autoFocus
                            margin="dense"
                            label="Symbol"
                            value={formik.values.symbol}
                            onChange={formik.handleChange}
                            fullWidth
                            id="stock-select"
                            name="symbol"
                        >
                            {filteredStocks.map((stock) => (
                                <MenuItem
                                    key={stock.symbol}
                                    value={stock.symbol}
                                >
                                    {stock.symbol}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            margin="dense"
                            label="Quantity"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            fullWidth
                            name="quantity"
                            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            helperText={formik.touched.quantity && formik.errors.quantity}
                        />
                        <TextField
                            margin="dense"
                            label="Price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            fullWidth
                            name="price"
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <DialogActions>
                            <Button
                                onClick={handleClose}
                                color="primary"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                            >
                                Add
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
    }

    export default AddStockPosition;
