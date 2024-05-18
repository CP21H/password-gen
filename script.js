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
    let SpecialChar = "£$&()*+[]@#^-_!?%";

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
    let str_rate = document.getElementById("strengthRating");
    let input = document.getElementById("userPassword");

    let score = 0;
    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    let hasSymbol = false;

    let specialChars = "£$&()*+[]@#^-_!?%";
    let uniqCharCount = 0;
    let hasUniqueChars = false;

    if (input.value.length >= 8) {
        score += 10;
    }

    for (let i = 0; i < input.value.length; i++) {
        if (input.value[i] == input.value[i].toLowerCase() && !hasLower && isNaN(input.value[i]) && !specialChars.includes(input.value[i])) {
            hasLower = true;
            score += 5;
        }
        if (input.value[i] == input.value[i].toUpperCase() && !hasUpper && isNaN(input.value[i]) && !specialChars.includes(input.value[i])) {
            hasUpper = true;
            score += 5;
        }
        if (!isNaN(input.value[i]) && !hasDigit) {
            hasDigit = true;
            score += 5;
        }
        if (!hasSymbol) {
            for (let j = 0; j < input.value.length; j++) {
                if (input.value[i] == specialChars[j]) {
                    hasSymbol = true;
                    score += 10;
                    break;
                }
            }
        }
        if (i + 1 <= input.value.length && input.value[i] != input.value[i+1] && !hasUniqueChars) {
            uniqCharCount++;
            if (uniqCharCount == 5) {
                hasUniqueChars = true;
                score += 5;
            }
        }
    }

    post_text.innerHTML = "Password Score: " + score + "/40";
    if (score < 10) {
        str_rate.innerHTML = "Password is: Very Weak";
    } else if (score < 20 && score >= 10) {
        str_rate.innerHTML = "Password is: Weak";
    } else if (score <= 35 && score >= 20) {
        str_rate.innerHTML = "Password is: Good";
    } else if (score > 35) {
        str_rate.innerHTML = "Password is: Strong";
    }
}