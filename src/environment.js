let APIURL = '';

switch (window.location.hostname) {
  case 'localhost':
  case '127.0.0.1':
    APIURL = 'http://localhost:8080'
    break
  case 'au-recip-cart.herokuapp.com':
    APIURL = 'https://au-recip-cart-node.herokuapp.com'
}

export default APIURL;
