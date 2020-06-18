const form = document.querySelector("#form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirm = document.getElementById("confirm")

// SHOW ERROR
function showError(input, message) {
  const formControl = input.parentElement
  formControl.className = "form__control error"
  const small = formControl.querySelector("small")
  small.innerText = message
}

// SHOW SUCCESS
function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = "form__control success"
}

// CHECK IF EMAIL IS VALID
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(input.value)) {
    showError(input, 'Email is not valid')
  } else {
    showSuccess(input);
  }
}

// CHECK IF INPUT IS EMPTY
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is a required field`)
    } else {
      showSuccess(input)
    }
  })
}

// CHECK INPUT LENGTH
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} cannot exceed ${max} characters`)
  } else {
    showSuccess(input)
  }
}

// CHECK IF PASSWORDS MATCH
function checkPasswordsMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, "Passwords do not match")
  }
}

// GET FIELD NAME
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// EVENT LISTENERS
form.addEventListener("submit", function (e) {
  e.preventDefault()
  checkRequired([username, email, password, confirm])
  checkLength(username, 3, 15)
  checkLength(password, 6, 20)
  checkEmail(email)
  checkPasswordsMatch(password, confirm)
})
