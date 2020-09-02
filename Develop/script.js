// get access to elements on the main page
var generateBtn = document.querySelector("#generate");
var slider = document.querySelector("#sldLength");
var valueText = document.querySelector("#sldValue");

// set up consts to allow a var array to store which character sets are being used
const SPECIAL_CHARARRAY_INDEX = 0;
const NUMBER_CHARARRAY_INDEX = 1;
const LOWER_CHARARRAY_INDEX = 2;
const UPPER_CHARARRAY_INDEX = 3;

// create object to generate the password
var pwdGenerator = {
  "useSpecial": true,
  "useNumbers": true,
  "useLower": true,
  "useUpper": true,
  "pwdLength": 12, // default to generally accepted min

  generatePassword: function () {
    var whichCharset = []; // array to store the indexes of the charset arrays in use

    // add charset array index to this array for each charset being used
    if (this.useSpecial) { 
      whichCharset.push(SPECIAL_CHARARRAY_INDEX);
    }
    if (this.useNumbers) {
       whichCharset.push(NUMBER_CHARARRAY_INDEX); 
      }
    if (this.useLower) {
      whichCharset.push(LOWER_CHARARRAY_INDEX); 
    }
    if (this.useUpper) {
       whichCharset.push(UPPER_CHARARRAY_INDEX); 
    }

    var pwd = "", pwdChar = "";
    // loop through for however many chars are needed, getting a random char each time
    for (var i = 0; i < this.pwdLength; i++) {

      // randomly get the charset to use 
      var charsetIndex = whichCharset[Math.floor(Math.random() * whichCharset.length)];

      // get a random char from selected charset
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

      // concat this char to what we have so far
      pwd = pwd + pwdChar;
    } // for

    return pwd;
  } // function generatePassword

}; // pwdGenerator object

// Write password to the #password input
function writePassword() {

  pwdGenerator.useSpecial = document.getElementById("chkSpecial").checked;
  pwdGenerator.useNumbers = document.getElementById("chkNumbers").checked;
  pwdGenerator.useLower = document.getElementById("chkLower").checked;
  pwdGenerator.useUpper = document.getElementById("chkUpper").checked;
  pwdGenerator.pwdLength = document.getElementById("sldLength").value;
  
  var passwordText = document.querySelector("#password");
  var password = "";
  
  // make sure the user has selected at least one option
  if (!pwdGenerator.useSpecial && !pwdGenerator.useNumbers && !pwdGenerator.useLower && !pwdGenerator.useUpper) {
    alert("At least one Include option needs to be selected.");
    password = "";
  }
  else {
    // generate the password
    password = pwdGenerator.generatePassword();
  }
  
  // display it on screen for the user
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// show slider value for length of password
slider.oninput = function () {
  valueText.textContent = this.value + " characters";
}