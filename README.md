## [Live Link](https://financier-customer.netlify.app/)

### Used ReactJS and Material UI for the design

### Steps I have taken to solve the given problem.

-   Made a class named Financier
-   Made a method in Financier to set total_amount & average_cibil_score for future use
-   Made a Customer class
-   In the function sort_financiers i sorted and make matching for the Financiers & Customers
-   In this function first loop through every customer to get their 3 best fit Financiers add added these 3 into matches list.
-   To get the 3 best fit Financiers
-   -   First i took **absolute difference of average cibil score and customer cibil score** and store it in a list with the Financier as tuple
-   -   Then sorted the list based on the **difference in Ascending order**(because if the **difference is low then high chance of getting loan**)
-   -   If the difference is same then it checked the total amount the Financier gave so far(Descending)
-   -   Now the first 3 element of the list is best fit.
