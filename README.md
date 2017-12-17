
# Conceptual Play

## Demo Google Oauth2.0 and Express rendering a React App.

You look and you seek and what do you find, a bunch of code so over-engineered that you need five screens and a marker pen to trace the construction.
So, with that said the examples are in one source code: server.js


>> see oauth_google

> Oauth2.0 for seamless sign-on and JWT for stateless API Calls

> Perhaps the biggest advantage to using tokens over cookies is the fact that token authentication is stateless. The back-end does not need to keep a record of tokens. Each token is self-contained, containing all the data required to check its validity as well as convey user information through claims.

> Just say no to Cookies. Cookies work well with singular domains and sub-domains, but when it comes to managing cookies across different domains, it can get hairy. In contrast, a token-based approach with CORS enabled makes it trivial to expose APIs to different services and domains. Since the JWT is required and checked with each and every call to the back-end, as long as there is a valid token, requests can be processed. There are a few caveats to this and we'll address those in the Common Questions and Concerns section below.
