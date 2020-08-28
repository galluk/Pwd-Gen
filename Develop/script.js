// *************************************************************************
// need to pull in the provided ArraysList.js file
function include(file) {

  var script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);

}

include('../Assets/ArraysList.js');
// *************************************************************************

// get access to the button on the main page
var generateBtn = document.querySelector("#generate");

// set up consts to allow a var array to store which character sets are being used
const SPECIAL_CHARARRAY_INDEX = 0;
const NUMBER_CHARARRAY_INDEX = 1;
const LOWER_CHARARRAY_INDEX = 2;
const UPPER_CHARARRAY_INDEX = 3;

var pwdGenerator = {
  "useSpecial" : true,
  "useNumbers" : true,
  "useLower" : true,
  "useUpper" : true,
  "pwdLength" : 8, // default to generally accepted min

  generatePassword: function() {
    var whichCharset = []; // array to store the indexes of the charset arrays in use
  
    // add char array index to this array for each char set being used
    if (this.useSpecial) { whichCharset.push(SPECIAL_CHARARRAY_INDEX); }
    if (this.useNumbers) { whichCharset.push(NUMBER_CHARARRAY_INDEX); }
    if (this.useLower) { whichCharset.push(LOWER_CHARARRAY_INDEX); }
    if (this.useUpper) { whichCharset.push(UPPER_CHARARRAY_INDEX); }
  
    var pwd = "", pwdChar = "";
    // loop through for however many chars are needed, getting a random char each time
    for (var i = 0; i < this.pwdLength; i++) {
      
      // randomly get the charset to use 
      var charsetIndex = whichCharset[Math.floor(Math.random() * whichCharset.length)];

      // get the random char from selected char set
      switch (charsetIndex) {
        case SPECIAL_CHARARRAY_INDEX:
          pwdChar = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
          break;
        case NUMBER_CHARARRAY_INDEX:
          pwdChar = numericCharacters[Math.floor(Math.random() * numericCharacters.length)];
          break;
        case LOWER_CHARARRAY_INDEX:
          pwdChar = lowerCasedCharacters[Math.floor(Math.random() * lowerCasedCharacters.length)];
          break;
        case UPPER_CHARARRAY_INDEX:
          pwdChar = upperCasedCharacters[Math.floor(Math.random() * upperCasedCharacters.length)];
          break;
  
        default:
          pwdChar = ""; // default to empty
      } // switch
  
      // concat this char with what we have so far
      pwd = pwd + pwdChar;
    } // for
  
    return pwd;  
  } // function generatePassword

}; // pwdGenerator object

// Write password to the #password input
function writePassword() {
  pwdGenerator.useSpecial = confirm("Do you want to include special characters?");
  pwdGenerator.useNumbers = confirm("Do you want to include numbers?");
  pwdGenerator.useLower = confirm("Do you want to include lower case letters?");
  pwdGenerator.useUpperSpecial = confirm("Do you want to include upper case letters?");
  pwdGenerator.pwdLength = prompt("Enter password length:");

  var password = pwdGenerator.generatePassword();
  // var password = generatePassword(includeSpecial, includeNumbers, includeLower, includeUpper, pwdLength);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);