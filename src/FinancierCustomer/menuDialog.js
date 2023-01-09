import {
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, {useState} from "react";

const MenuDialog = ({anchorEl, setAnchorEl, loanHistory}) => {
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{horizontal: "right", vertical: "top"}}
            anchorOrigin={{horizontal: "right", vertical: "bottom"}}
        >
            <Table sx={{minWidth: 70}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Total Amount</TableCell>
                        <TableCell align="right">Civil Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loanHistory.map((loan, i) => (
                        <TableRow
                            key={i}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {loan[0]}
                            </TableCell>
                            <TableCell align="right">{loan[1]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Menu>
    );
};

export default MenuDialog;
