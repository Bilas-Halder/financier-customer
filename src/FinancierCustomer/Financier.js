import React, {useState} from "react";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {BsEyeFill} from "react-icons/bs";
import {
    Button,
    Stack,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from "@mui/material";
import MenuDialog from "./menuDialog";
import {Financier} from "./functionality";

const FinancierData = ({financiers, setFinanciers}) => {
    const [loanHistory, setLoanHistory] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleEyeClick = (event, loanHistory) => {
        setAnchorEl(event.currentTarget);
        setLoanHistory(loanHistory);
    };

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
            ...financiers.map((c, i) => {
                return {id: i, ...c};
            }),
        ],
        columns: [
            {field: "name", headerName: "Name", width: 150},
            {
                field: "averageCivil",
                headerName: "Average Civil Score",
                width: 160,
            },
            {field: "totalAmount", headerName: "Total Amount", width: 110},
            {
                field: "loanHistory",
                headerName: "Loan History",
                width: 100,
                align: "center",
                sortable: false,
                renderCell: (param) => {
                    return (
                        <IconButton
                            color="primary"
                            aria-label="See loan history"
                            onClick={(e) =>
                                handleEyeClick(e, param?.row?.loanHistory)
                            }
                        >
                            <BsEyeFill />
                        </IconButton>
                    );
                },
            },
        ],
    };
    return (
        <div>
            <p className="title">Financiers Data</p>
            <Stack
                direction="row"
                spacing={1}
                sx={{mb: 1}}
                justifyContent={"end"}
            >
                <Button
                    size="medium"
                    onClick={() => {
                        setOpenDialog(!openDialog);
                    }}
                >
                    Add New Financier
                </Button>
            </Stack>
            <DataGrid
                disableColumnFilter
                disableSelectionOnClick
                autoHeight
                {...data}
                components={{Toolbar: GridToolbar}}
                pageSize={10}
            />
            <MenuDialog
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                loanHistory={loanHistory}
            />

            <Dialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(!openDialog);
                }}
            >
                <DialogTitle>Add New Financier</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                To subscribe to this website, please enter your email
                address here. We will send updates occasionally.
            </DialogContentText> */}
                    <TextField
                        autoFocus
                        id="name"
                        label="Financier Name"
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
                    <div style={{fontWeight: 600, marginTop: "1rem"}}>
                        Loan History -
                    </div>
                    <Stack direction={"row"} spacing={5} sx={{mt: 0.8}}>
                        <TextField
                            autoFocus
                            id="lha1"
                            label="Amount"
                            type="number"
                            fullWidth
                            required
                            variant="standard"
                            helperText={
                                helper?.lha1 && (
                                    <span style={{color: "red"}}>
                                        Enter Amount
                                    </span>
                                )
                            }
                            onChange={onTextFieldChange}
                        />
                        <TextField
                            autoFocus
                            id="lhc1"
                            label="Civil Score"
                            type="number"
                            fullWidth
                            required
                            variant="standard"
                            helperText={
                                helper?.lhc1 && (
                                    <span style={{color: "red"}}>
                                        Enter Civil Score
                                    </span>
                                )
                            }
                            onChange={onTextFieldChange}
                        />
                    </Stack>
                    <Stack direction={"row"} spacing={5} sx={{mt: 0.8}}>
                        <TextField
                            autoFocus
                            id="lha2"
                            label="Amount"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={onTextFieldChange}
                        />
                        <TextField
                            autoFocus
                            id="lhc2"
                            label="Civil Score"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={onTextFieldChange}
                        />
                    </Stack>
                    <Stack direction={"row"} spacing={5} sx={{mt: 0.8}}>
                        <TextField
                            autoFocus
                            id="lha3"
                            label="Amount"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={onTextFieldChange}
                        />
                        <TextField
                            autoFocus
                            id="lhc3"
                            label="Civil Score"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={onTextFieldChange}
                        />
                    </Stack>
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
                            } else if (!formData.lha1) {
                                setHelper({...helper, lha1: true});
                                return;
                            } else if (!formData.lhc1) {
                                setHelper({...helper, lhc1: true});
                                return;
                            }

                            let data = [
                                [
                                    parseInt(formData.lha1),
                                    parseInt(formData.lhc1),
                                ],
                            ];

                            if (formData.lha2 && formData.lhc2) {
                                data = [
                                    ...data,
                                    [
                                        parseInt(formData.lha2),
                                        parseInt(formData.lhc2),
                                    ],
                                ];
                            }
                            if (formData.lha3 && formData.lhc3) {
                                data = [
                                    ...data,
                                    [
                                        parseInt(formData.lha3),
                                        parseInt(formData.lhc3),
                                    ],
                                ];
                            }

                            const fin = new Financier(formData.name, data);
                            setFinanciers([...financiers, fin]);
                            setOpenDialog(false);
                            setFormData({});
                            data = [];
                        }}
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FinancierData;
