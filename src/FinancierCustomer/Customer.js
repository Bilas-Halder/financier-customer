import React, {useState} from "react";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {BsEyeFill} from "react-icons/bs";
import {
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
} from "@mui/material";
import {Customer} from "./functionality";

const CustomersData = ({customers, setCustomers, gridCustomers}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({});
    const [helper, setHelper] = useState({});

    const onTextFieldChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        setHelper({...helper, [e.target.id]: false});
    };

    const data = {
        rows: [
            ...gridCustomers.map((c, i) => {
                return {id: i, ...c};
            }),
        ],
        columns: [
            {field: "name", headerName: "Name", width: 150},
            {field: "civilScore", headerName: "Civil Score", width: 100},
            {field: "m1", headerName: "Match 1", width: 100, sortable: false},
            {field: "m2", headerName: "Match 2", width: 100, sortable: false},
            {field: "m3", headerName: "Match 3", width: 100, sortable: false},
        ],
    };
    return (
        <div>
            <p className="title">Customers Data</p>
            <Stack
                direction="row"
                justifyContent={"end"}
                spacing={1}
                sx={{mb: 1}}
            >
                <Button
                    size="medium"
                    onClick={() => {
                        setOpenDialog(!openDialog);
                    }}
                >
                    Add New Customer
                </Button>
            </Stack>
            <DataGrid
                disableColumnFilter
                autoHeight
                {...data}
                components={{Toolbar: GridToolbar}}
                pageSize={10}
            />

            <Dialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(!openDialog);
                }}
            >
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email
                        address here. We will send updates occasionally.
                    </DialogContentText> */}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Customer Name"
                        type="text"
                        fullWidth
                        required
                        variant="standard"
                        helperText={
                            helper?.name && (
                                <span style={{color: "red"}}>
                                    Please enter name
                                </span>
                            )
                        }
                        onChange={onTextFieldChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="civilScore"
                        label="Customer Civil Score"
                        type="number"
                        fullWidth
                        required
                        variant="standard"
                        helperText={
                            helper?.civilScore && (
                                <span style={{color: "red"}}>
                                    Please enter Civil Score
                                </span>
                            )
                        }
                        onChange={onTextFieldChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenDialog(!openDialog);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            if (!formData.name) {
                                setHelper({...helper, name: true});
                                return;
                            } else if (!formData.civilScore) {
                                setHelper({...helper, civilScore: true});
                                return;
                            }
                            const cus = new Customer(
                                formData.name,
                                formData.civilScore
                            );
                            setCustomers([...customers, cus]);
                            setOpenDialog(false);
                            setFormData({});
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CustomersData;
