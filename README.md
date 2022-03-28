# NodeJS-Wallet-Task

## Requirements: 
- Node and npm
- $npm install (to install dependencies) 
- Set values of environment variables in .env file.
- $npm start (to start/ run server)

## Routes: 

- Pass Authorization header value as: "Bearer JwtToken"

### Auth Routes
> /signup
- Req: POST
- To signup as a new user.
- Req Body Input: name, email and password

> /login
- Req: POST
- To login as an existing user.
- Req Body Input: email and password

> /logout
- Req: POST
- TO logout as an existing user.
- HeaderRequired: Authorization

### Admin Routes
> /admin/verification/getOTP
- Req: GET
- To get OTP mail to get verified as an admin.
- HeaderRequired: Authorization

> /admin/verification/verifyOTP
- Req: POST
- To verify received OTP to get verified as an admin.
- Req Body Input: otp
- HeaderRequired: Authorization

#### You have to be verified to access the two admin routes below.

> /admin/transactions
- Req: GET
- To get all transactions that have happened on wallet.
- HeaderRequired: Authorization

> /admin/transactions/:transactionId
- Req: GET
- To get details of a particular transaction.
- HeaderRequired: Authorization
- Req Params Required: transactionId


### Transaction Routes
> /transaction/send
- Req: POST
- To send a transaction to another user.
- Req Body Input: receiverEmail, transferAmount
- HeaderRequired: Authorization


### User Routes
> /details
- Req: GET
- To get own details.
- HeaderRequired: Authorization

> /balance
- Req: GET
- To get own balance.
- HeaderRequired: Authorization

> /transactions
- Req: GET
- To get own transactions.
- HeaderRequired: Authorization
