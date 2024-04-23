var productList = [];

if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct();
}

// ? OR
// var productList;

// if(localStorage.getItem('productList') != null)
// {
//    productList = JSON.parse(localStorage.getItem('productList'));
//    displayProduct();
// }
// else
// {
//   var productList = [];
// }
var productNameInput = document.getElementById("productName");

var productPriceInput = document.getElementById("productPrice");

var productCategoryInput = document.getElementById("productCategory");

var productDescInput = document.getElementById("productDesc");

console.log(productNameInput, productPriceInput, productCategory, productDesc);

// Declaration Function  ==> Hoisting
/** 
 @desc AddProduct Form
 */
function AddProduct() {
  if (validateProductName() == true && validateProductPrice() == true && validateProductCategory() == true && validateProductDesc() == true) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value,
    };
    productList.push(product);
    localStorage.setItem("productList", JSON.stringify(productList));
    console.log(productList);
    clearForm();
    displayProduct();
    document.getElementById("btnAdd").setAttribute("disabled", "disabled");
  }
}

// Declaration Function   ==> Hoisting
/** 
 @desc Reset Form
 */
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

function displayProduct() {
  var cartoona = ``;

  for (var i = 0; i < productList.length; i++) {
    var index = i + 1;
    cartoona +=
      ` <tr
    class="table-primary"
 >
    <td scope="row">` +
      i +
      `</td>
    <td>` +
      productList[i].name +
      `</td>
    <td>` +
      productList[i].price +
      `</td>
    <td>` +
      productList[i].category +
      `</td>
    <td>` +
      productList[i].desc +
      `</td>
    <td><button class="btn btn-outline-info" onclick="updateProduct(${i})">Update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i});">Delete</button></td>
 </tr>`;
    // OR
    // `
    //       <tr class="table-primary">
    //         <td scope="row">${i + 1}</td>
    //         <td>${productList[i].name}</td>
    //         <td>${productList[i].price}</td>
    //         <td>${productList[i].category}</td>
    //         <td>${productList[i].desc}</td>
    //         <td><button class="btn btn-outline-info">Update</button></td>
    //         <td><button class="btn btn-outline-danger">Delete</button></td>
    //       </tr>`
  }

  document.getElementById("tableBody").innerHTML = cartoona;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(productList));
  displayProduct();
}

function searchProduct(term) {
  var cartoona = ``;
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(term.toLowerCase()) == true
    ) {
      //  console.log(i);
      cartoona +=
        ` <tr
    class="table-primary"
 >
    <td scope="row">` +
        i +
        `</td>
    <td>` +
        productList[i].name +
        `</td>
    <td>` +
        productList[i].price +
        `</td>
    <td>` +
        productList[i].category +
        `</td>
    <td>` +
        productList[i].desc +
        `</td>
    <td><button class="btn btn-outline-info">Update</button></td>
    <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
 </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cartoona;
  }
}

function updateProduct(index) {
  console.log(productList[index]);
  // Fill the form fields with the details of the product being updated
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescInput.value = productList[index].desc;

  // Change the button text to indicate update action
  document.getElementById("btnAdd").innerHTML = "Update Product";

  // Overwrite the AddProduct click event to handle updates
  document.getElementById("btnAdd").onclick = function () {
    productList[index] = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desc: productDescInput.value,
    };

    localStorage.setItem("productList", JSON.stringify(productList));
    console.log(productList);
    clearForm();
    displayProduct();

    // Reset button text and click event after updating
    document.getElementById("btnAdd").innerHTML = "Add Product";
    document.getElementById("btnAdd").onclick = AddProduct;
    document.getElementById("btnAdd").setAttribute("disabled", "disabled");

  };
}


/**
 * @desc validateProductName 2 char or 6 char with start capitalization
 * */
function validateProductName() {
  var regex = /^[A-Z][a-z]{2,6}$/;
  if (regex.test(productNameInput.value) == true) {
    document.getElementById('productNameError').innerText = ''; // Clear error message
    return true;
  }
  else {
    document.getElementById('productNameError').innerText = 'Product name must start with a capital letter and be 3 to 7 characters long';
    return false;
  }
}

/**
 * @desc validateProductPrice from 1000 to 10000
 * */

function validateProductPrice() {

  var regex = /^1000(?:\.0{1,2})?$|^10000(?:\.0{1,2})?$|^[1-9]\d{3}(?:\.\d{1,2})?$/;
  if (regex.test(productPriceInput.value) == true) {
    document.getElementById('productPriceError').innerHTML = "";
    return true;
  }
  else {
    document.getElementById('productPriceError').innerHTML = 'Product price must be between 1000 and 10000';
    return false;
  }
}

/**
* @desc validateProductCategory 2 char or 6 char with start capitalization
* */
function validateProductCategory() {
  var regex = /^(Mobile|TV|Laptop)$/;
  if (regex.test(productCategoryInput.value) == true) {
    document.getElementById('productCategoryError').innerText = '';
    return true;
  }
  else {
    document.getElementById('productCategoryError').innerText = 'Product category must be Mobile or TV or Laptop';
    return false;
  }
}
/**
 * @desc validateProductDesc contains the product description one or 30 spaces separated words
 * */
function validateProductDesc() {
  var regex = /^(?:\S+\s+){0,30}\S+$/;
  if (regex.test(productDescInput.value) == true) {
    document.getElementById('productDescError').innerHTML = '';
    return true;
  }
  else {
    document.getElementById('productDescError').innerHTML = 'Product description must contain 1 to 30 words separated by spaces';
    return false;
  }
}

function checkValidations() {
  if (validateProductName() && validateProductPrice() && validateProductCategory()&& validateProductDesc()) {
      document.getElementById("btnAdd").removeAttribute("disabled");
  } else {
      document.getElementById("btnAdd").setAttribute("disabled", "disabled");
  }
}

productNameInput.addEventListener("input", checkValidations);
productPriceInput.addEventListener("input", checkValidations);
productCategoryInput.addEventListener("input", checkValidations);
productDescInput.addEventListener("input", checkValidations);

// ! JSON Stand for
// **JavaScript Object notation
//** JSON.stringify();
// ?  convert from JSON to string
// ! Reverse it
//**JSON.parse();
// ?  convert from string to JSON

// ** Local storage VS Session storage format
// ? the only difference between local storage and session storage when using session storage data remove when close tap browser

// ! template literal in ECMA Script 6
// ** https://www.programiz.com/javascript/template-literal

// ! onKeyPress VS onKeyDown VS onkeyUp

// ? onKeyPress  ===> when pressing on any button on the keyboard except the special characters(tap,shift,backspace,caps lock....)

// ? onKeyDown   ===> when pressing on any button on the keyboard

// ? onKeyUp     ===> when pressing on any button characters on the keyboard

// **
var x = "Hadeer Salah";

console.log(x.indexOf("H")); //0

console.log(x[0]); //H

console.log(x.includes("")); // always true

console.log(x.includes(" ")); // true

// ! Note :
// ? `` back tech === '' single quotes === "" double quotes

// ** validation in js ==> Regex stand for Regular Expression **

// ? /abc/       ==> include abc (and) all true
// ? /[abc]/     ==> include a or b or c (or) any one true or all true
// ? /[a-z]/     ==> any one character in range from a to z
// ? /[a-z0-9]/  ==> any one character in range from a to z OR any one number in range from 0 to 9 (any char or any number in range from 0 to 9 , a-z)
// ? /[a-z 0-9]/ ==> any char in range from a to z OR any space OR any number in range from 0 to 9
// ? /[a-zA-Z]/  ==> any char in range from a to z OR any any char in range from A to Z (any char small or capital letter)
// ! Reverse
// ? /[^a-z]/    ==> any one character except char in range from a to z
// ? /[^a-z0-9]/ ==> any one character except char in range from a to z and number in range from 0 to 9 (add special characters only)
// ? /[^ ]/      ==> any character except space
// ? /[^*]/      ==> any character except sign *
// ? /(a|z)/     ==> a OR z
// ? /(0|3)/     ==> 0 OR 3
// ? /[web  development]/      ==> digit digit w or e or b
// ? /(web|development)/       ==> web or development
// ? /web (web|development)/   ==> web web or web development in any place
// ? /^web (web|development)/  ==> ^ start with
// ? /^web (web|development)$/ ==> ^ start with , $ end with
// ? /^[A-Z]hadeer[a-z]$/      ==> start one char from A to Z and hadeer and end with one char from a to z
// ? /^[A-Z]{3,6}hadeer[a-z]$/      ==> start three or six char from A to Z and hadeer and end with one char from a to z
// ! when add <3 or >6 not match  min ==> 3 and max ==> 6
// ? /^[A-Z]{3,}hadeer[a-z]$/      ==> start three or >3 without limit (infinity) char from A to Z and hadeer and end with one char from a to z

// ? /^012[0-9]{8}$/                    ==> mobile number orange egypt
// ? /^01[0125][0-9]{8}$/               ==> egypt mobile number
// ? /^(00201|01)[0125][0-9]{8}$/       ==> egypt mobile number
// ? /^(002){0,1}01[0125][0-9]{8}$/     ==> egypt mobile number
// ? /^(002)?01[0125][0-9]{8}$/         ==> egypt mobile number   ? ==> optional Zero or one
//  TODO (?)   ==> optional Zero or one
//  TODO (*)   ==>  Zero or more
//  TODO (+)   ==>  one or more

// ?  /^([1-7][0-9]|80) $/                                  ==> Age from 10 to 80 ==> min 10 and max 80
// ? \d      ==> any digit number
// ! Reverse 
// ? \D      ==> any character
// ? \w      ==> any character , special characters , under score _ and number except space  [a-zA-Z0-9_]
// ! Reverse 
// ? \W     ==> [^a-zA-Z0-9_]
// ? \s     ==> space
// ! Reverse 
// ? \S     ==> any except space
// ? .      ==>dot ==> any object
// ? ....   ==>4dot ==> any 4 object
// ? \$     ==> sign dollar
// ! /^ 80$$/  ===> this Wrong
// TODO /^ 80\$$/   ==>  this true
// ? /^ 80 \^2$/    ==> 80^2 ==> sign power of 2
// ? g ==> global (All char)
// ? i ==> in-sentsitive capital or small 
// ? m ==> multiple line
// ** https://support.bettercloud.com/s/article/Creating-your-own-Custom-Regular-Expression-bc72153
//  Ex Regex in JS regex pattern
var x = 'Hadeer';
var regex = /^[A-Z]/;
console.log(regex.test(x));
console.log(x.match(regex));
// ? /^[A-Z]/ig    ==> all characters capital and small
var y = 'web test web test'.replace('web', 'Ahmed');
var y = 'web test web test'.replace('/web/', 'Ahmed');
var y = 'web test web test'.replace('/web/g', 'Ahmed');
console.log(y);


// ? validateProductPrice from 1000 to 10000
// var regex=/^1000(?:\.0{1,2})?$|^10000(?:\.0{1,2})?$|^[1-9]\d{3}(?:\.\d{1,2})?$/;
