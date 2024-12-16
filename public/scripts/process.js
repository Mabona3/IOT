const authen = document.getElementById('Authenticated')
const auth_button = document.getElementById('button_control_iot')
const auth_div = document.getElementById('div_control_iot')
const hint = document.getElementById("Hint")
let tries = 0
const arrayGuesses = new Array(6)
const ranNum = Math.floor(Math.random() * 50 + 1)

const unAuthenticated = function () {

  auth_div.parentNode.removeChild(auth_div)
  hint.parentNode.removeChild(hint)

  let choices = "Your tries are: "

  for (guess of arrayGuesses) {
    choices += guess + " "
  }

  authen.appendChild(document.createTextNode(choices))
  authen.appendChild(document.createElement('br'))
  choices = "UnAuthorized access"
  authen.appendChild(document.createTextNode(choices))
}

function submitForm(event) {
  event.preventDefault()
  const trig = event.target
  const parent = trig.parentNode
  // parent.setAttribute('action', trig.id)
  // parent.submit()
  fetch('/' + trig.id, {method: 'POST'})
}

const Authenticated = function () {
  auth_div.parentNode.removeChild(auth_div)
  hint.parentNode.removeChild(hint)

  On = document.createElement("button")
  On.setAttribute("id", "SysOn")
  Off = document.createElement("button")
  Off.setAttribute("id", "SysOff")
  On.textContent = "On"
  Off.textContent = "Off"
  On.onclick = submitForm
  Off.onclick = submitForm
  
  const img = document.getElementsByClassName('auth_img')[0]
  img.style.display = 'block';

  const form = document.createElement("form")
  form.setAttribute('method', 'POST')
  form.appendChild(On)
  form.appendChild(Off)

  authen.appendChild(form)

}

const guessNumber = function (event) {
  event.preventDefault()

  value = document.getElementById('input_value').value

  num = parseInt(value)

  value.value = ""
  console.log(ranNum)
  if (num == ranNum) {
    Authenticated()
  } else {
    arrayGuesses[tries++] = num
    if (tries == 6) {
      unAuthenticated()
    } else if (num > ranNum) {
      if (tries != 1) {
        hint.removeChild(hint.firstChild)
      }
      hint.appendChild(document.createTextNode("Try No. " + tries +": Too High"))

    } else {
      if (tries != 1) {
        hint.removeChild(hint.firstChild)
      }
      hint.appendChild(document.createTextNode("Try No. " + tries +": Too Low"))

    }
  }
}

auth_button.addEventListener("click", function (event) {

  auth_button.setAttribute("disabled", false)

  const questionNode = document.createTextNode("Guess a number between 1 and 50")
  const form = document.createElement("form")
  const textInput = document.createElement("input")
  const submitInput = document.createElement("input")

  textInput.setAttribute("type", "text")
  submitInput.setAttribute("type", "submit")

  textInput.value = ""
  textInput.setAttribute('id', 'input_value')
  submitInput.value = "submit"

  form.addEventListener('submit', guessNumber)

  form.appendChild(questionNode)
  form.appendChild(textInput)
  form.appendChild(submitInput)

  auth_div.appendChild(form)

})
