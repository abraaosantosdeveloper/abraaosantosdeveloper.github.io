const welcome_text = document.getElementById("name")
const text = welcome_text.innerHTML
var index = 0
let underscoreVisible = true;


const write = () => {
    welcome_text.innerHTML = welcome_text.innerHTML.replace("_", "")

    if (text.length > index){
        if (index == 0){
            welcome_text.innerHTML = text.charAt(index)
        } else {
            
            welcome_text.innerHTML += text.charAt(index)
        }

        welcome_text.innerHTML += "_"

        index++
        setTimeout(write, 150)
    }
    else {
        blinkUnderscore();
    }
}

const blinkUnderscore = () => {
    const underscore = document.createElement('span');
    underscore.textContent = "_";
    underscore.style.color = "#2c2c2c";
    underscore.style.transition = "opacity 0.5s";
    welcome_text.appendChild(underscore);

    setInterval(() => {
        underscore.style.opacity = underscoreVisible ? '0' : '1'; 
        underscoreVisible = !underscoreVisible;
    }, 500);
}

write()

