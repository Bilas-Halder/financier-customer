export class Financier {
    constructor(name, loanHistory) {
        this.name = name;
        this.loanHistory = loanHistory;
        this.setAverageTotal();
    }

    setAverageTotal() {
        let totalAmount = 0;
        let totalCivil = 0;
        for (const loan of this.loanHistory) {
            totalAmount += loan[0];
            totalCivil += loan[1];
        }
        this.averageCivil = totalCivil / this.loanHistory.length;
        this.totalAmount = totalAmount;
    }
}

export class Customer {
    constructor(name, civilScore) {
        this.name = name;
        this.civilScore = civilScore;
    }
}

export function sortFinanciers(financiers, customer) {
    const matches = [];
    const diff = financiers.map((financier) => [
        Math.abs(financier.averageCivil - customer.civilScore),
        financier,
    ]);
    diff.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1].totalAmount - a[1].totalAmount;
        }
        return a[0] - b[0];
    });
    matches.push(...diff.slice(0, 3).map((item) => item[1].name));
    return {
        ...customer,
        m1: matches[0],
        m2: matches[1],
        m3: matches[2],
    };
}

export const demoFinanciers = [
    new Financier("Financier 1", [
        [100, 700],
        [50, 650],
        [75, 600],
    ]),
    new Financier("Financier 2", [
        [100, 750],
        [50, 700],
        [75, 650],
    ]),
    new Financier("Financier 3", [
        [100, 800],
        [50, 750],
        [75, 700],
    ]),
];
export const demoCustomers = [
    new Customer("Customer 1", 750),
    new Customer("Customer 2", 700),
    new Customer("Customer 3", 650),
];

// export const demoFinanciers = [
//     new Financier("Financier 1", [
//         [100, 700],
//         [50, 650],
//         [75, 600],
//     ]),
//     new Financier("Financier 2", [
//         [100, 750],
//         [50, 700],
//         [75, 650],
//     ]),
//     new Financier("Financier 3", [
//         [100, 750],
//         [50, 700],
//         [75, 650],
//     ]),
//     new Financier("Financier 4", [
//         [100, 750],
//         [51, 700],
//         [75, 650],
//     ]),
//     new Financier("Financier 5", [
//         [100, 800],
//         [50, 750],
//         [75, 700],
//     ]),
// ];
// export const demoCustomers = [
//     new Customer("Customer 1", 750),
//     new Customer("Customer 2", 700),
//     new Customer("Customer 3", 650),
//     new Customer("Customer 4", 500),
// ];
