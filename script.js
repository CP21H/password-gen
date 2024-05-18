function submRun() {
    let post_text = document.getElementById("generatedPass");
    let input = document.getElementById("plength");
    const num = parseInt(input.value);

    let password = passGenerate(num);
    post_text.innerHTML = "Password Generated: " + password;
}

function passGenerate(length) {
    let lowCase = "abcdefghijklmnopqrstuvxyz";
    let upCase = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    let Numbers = "0123456789";
    let SpecialChar = "£$&()*+[]@#^-_!?";

    let password = "";
    let charCategories = 4;

    for (let i = 0; i < length; i++) {
        let chosenCharGroup = Math.floor(Math.random() * charCategories);

        switch (chosenCharGroup) {
            case 0: {
                let lowCaseSize = lowCase.length;
                let index = Math.floor(Math.random() * lowCaseSize);
                password += lowCase[index];
                break;
            }
            case 1: {
                let upCaseSize = upCase.length;
                let index = Math.floor(Math.random() * upCaseSize);
                password += upCase[index];
                break;
            }
            case 2: {
                let numSize = Numbers.length;
                let index = Math.floor(Math.random() * numSize);
                password += Numbers[index];
                break;
            }
            case 3: {
                let specCharSize = SpecialChar.length;
                let index = Math.floor(Math.random() * specCharSize);
                password += SpecialChar[index];
                break;
            }
            default: {
                break;
            }
        }
    }

    return password;
}

function passStrCheck() {
    let post_text = document.getElementById("passCheckResult");
    let input = document.getElementById("userPassword");
}