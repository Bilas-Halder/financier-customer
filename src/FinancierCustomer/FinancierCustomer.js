import {Container} from "@mui/material";
import React, {useEffect, useState} from "react";
import CustomersData from "./Customer";
import FinancierData from "./Financier";
import "./style.css";
import {demoFinanciers, demoCustomers, sortFinanciers} from "./functionality";

const FinancierCustomer = () => {
    const [financiers, setFinanciers] = useState([...demoFinanciers]);
    const [customers, setCustomers] = useState([...demoCustomers]);
    const [gridCustomers, setGridCustomers] = useState([]);

    useEffect(() => {
        const newCus = [];
        console.log(customers);
        for (const i in customers) {
            const match = sortFinanciers(financiers, customers[i]);
            newCus.push(match);
        }
        setGridCustomers(newCus);
    }, [financiers, customers]);

    return (
        <Container>
            <div className="divider">
                <FinancierData
                    financiers={financiers}
                    setFinanciers={setFinanciers}
                />
                <CustomersData
                    gridCustomers={gridCustomers}
                    customers={customers}
                    setCustomers={setCustomers}
                />
            </div>
        </Container>
    );
};

export default FinancierCustomer;
