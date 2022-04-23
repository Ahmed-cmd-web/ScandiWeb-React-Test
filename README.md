<!-- @format -->

# This project was Setup with create-react-app.

A simple project representing a basic ecommerce web App.
This project is based mainly on React,Redux,Styled Components,React-Router-Dom, React class components,and Apollo client.

## There is only one bug in such app:

When adding products to the cart,the console would set a warning mentioning findNodeDom Usage is deprecated.However,this warning could be avoided by removing the StrictMode Tags from around the App component in the index.js file.

## This app's Features are:

- Ability to filter products through the tabs in the header.
- Ability to change the currency of the store to one of the available currencies.
- Products are customizable,if needed.
- Products not found are handled gracefully by the app.
  To test it,just type the localhost + ${/PDP/whateverulike}.
- Products could be added,removed,or changed in quantity from the cart page itself, PLP and PDP .
- Same Products with same attributes are sumed up in quantity.
- Same Products with different attributes are stacked one over another.
- To remove products from a cart,just decrement the quantity till 0.
- The selected options of added to cart products are visible in cart overlay and in cart page (could not be changed).
- If an attribute is a swatch attribute (has color choice), a representation of the value is rendered on PDP and PLP, rather than text description (e.g. the color itself, not "Blue" or "0000FF")
- To return to home page(Categories Page) just click on the logo.
- Products with no attributes could be added directly from PLP.

## Bug fixtures

- Added the ability to navigate to category page from any page when the tabs are clicked.
- Dropdowns remain visible until clicked outside of them.
- The last row is aligned to the start of the page.
- Jacket Image resized.
- Airtag bug fixed.
- Remove Button added to cart overlay and Mybag products.
- Image Slider Added.
- Popup for all products has been added.
- ScrollBars reduced.
- Currency switcher design adjusted.

# Scandiweb's Entry React developer TEST project.
