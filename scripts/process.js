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

const Authenticated = function () {
  auth_div.parentNode.removeChild(auth_div)
  hint.parentNode.removeChild(hint)

  On = document.createElement("button")
  Off = document.createElement("button")

  On.setAttribute("id", "On_button")
  Off.setAttribute("id", "Off_button")

  On.textContent = "On"
  Off.textContent = "Off"

  const img = document.createElement('img')
  img.src = "./images/Liquid-level-monitoring.png"
  img.width = 500
  img.height= 500

  const form = document.createElement("form")
  form.appendChild(On)
  form.appendChild(Off)

  authen.appendChild(img)
  authen.appendChild(form)

}

const guessNumber = function (event) {
  event.preventDefault()

  value = document.getElementById('input_value').value

  num = parseInt(value)

  value.value = ""

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
        hint.appendChild(document.createTextNode("Too High"))
      
    } else {
      if (tries != 1) {
        hint.removeChild(hint.firstChild)
      } 
      hint.appendChild(document.createTextNode("Too Low"))
      
    }
  }
}

auth_button.addEventListener("click" , function (event) {

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
