from typing import List, Tuple


class Financier:
    def __init__(self, name: str, loan_history: List[Tuple[int, int]]):
        self.name = name
        self.loan_history = loan_history
        self.set_average_total()

    def set_average_total(self):
        total_amount = 0
        total_cibil = 0
        for loan in self.loan_history:
            total_amount += loan[0]
            total_cibil += loan[1]

        self.average_cibil_score = total_cibil/len(self.loan_history)
        self.total_amount = total_amount
        # we will need the total_amount and average_cibil_score letter to make it easy i am counting these in the initialization


class Customer:
    def __init__(self, name: str, cibil_score: int):
        self.name = name
        self.cibil_score = cibil_score


def sort_financiers(financiers: List[Financier], customers: List[Customer]) -> List[Tuple[Financier, Customer]]:
    matches = []

    # for every customer checking the best match
    for customer in customers:
        # making a list of absolute of difference in cibil score and financier as tuple
        diff = [(abs(financier.average_cibil_score - customer.cibil_score), financier)
                for financier in financiers]

        # sorting the financiers in descending order based on the difference and using the total amount as secondary sort key
        diff.sort(key=lambda x: (x[0], -x[1].total_amount))

        # taking best 3 match and extending matches for this customer
        matches.extend([(financier, customer) for diff, financier in diff[:3]])

    return matches


def print_matches(matches):
    i = 0
    for match in matches:
        i += 1
        if(i % 3 == 0):
            print("({0} , {1})".format(match[0].name, match[1].name))
        else:
            print("({0} , {1})".format(match[0].name, match[1].name), end=", ")


# given example
financiers = [Financier("Financier 1", [(100, 700), (50, 650), (75, 600)]),
              Financier("Financier 2", [(100, 750), (50, 700), (75, 650)]),
              Financier("Financier 3", [(100, 800), (50, 750), (75, 700)])]
customers = [Customer("Customer 1", 750),
             Customer("Customer 2", 700),
             Customer("Customer 3", 650)]

# financiers = [Financier("Financier 1", [(100, 700), (50, 650), (75, 600)]),
#               Financier("Financier 2", [(100, 750), (50, 700), (75, 650)]),
#               Financier("Financier 3", [(100, 750), (50, 700), (75, 650)]),
#               Financier("Financier 4", [(100, 750), (51, 700), (75, 650)]),
#               Financier("Financier 5", [(100, 800), (50, 750), (75, 700)])]
# customers = [Customer("Customer 1", 750),
#              Customer("Customer 2", 700),
#              Customer("Customer 3", 650),
#              Customer("Customer 4", 500)]

matches = sort_financiers(financiers, customers)
print_matches(matches)
