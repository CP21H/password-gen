#include <iostream>
#include <string>
#include <math.h>

void passStrengthCheck(std::string password);
std::string passGen(int length);

int main() {
    int userInput;
    do {
        std::cout << "\n";
        std::cout << "-------------------------------------" << std::endl;
        std::cout << "| 1. Check strength of your password" << std::endl;
        std::cout << "| 2. Generate a secure password" << std::endl;
        std::cout << "| 0. Exit Program" << std::endl;
        std::cout << "-------------------------------------" << std::endl;

        std::cout << "Choice: ";
        std::cin >> userInput;

        switch (userInput) {
            case 1: {
                std::string password;
                std::cout << "Enter your password: ";
                std::cin >> password;
                passStrengthCheck(password);
                break;
            }
            case 2: {
                int length;
                std::cout << "Enter a password length: ";
                std::cin >> length;
                std::cout << "Password Generated: " << passGen(length);
                break;
            }
            default: {
                break;
            }
        }
    } while (userInput != 0);
    return 0;
}

// *****************************************************************
// * Function Name: passStrengthCheck(string password)             *
// * Description: Takes in a users password and checks strength    *
// * Parameter Description: std::string password, represents user  *
// * password                                                      *
// * Date: 05/14/2024                                              *
// * Author: Cristhian Prado                                       *
// * References:  None                                             *
// *****************************************************************
void passStrengthCheck(std::string password) {
    int score = 0;

    bool hasLower = false;
    bool hasUpper = false;
    bool hasDigit = false;
    bool hasSymbol = false;

    std::string specialChars = "£$&()*+[]@#^-_!?%";
    int uniqCharCount = 0;
    bool hasUniqueChars = false;

    if (password.size() >= 8) {
        score += 10;
    }

    for (int i = 0; i < password.size(); i++) {
        if (islower(password[i]) && !hasLower) {
            hasLower = true;
            score += 5;
        }
        if (isupper(password[i]) && !hasUpper) {
            hasUpper = true;
            score += 5;
        }
        if (isdigit(password[i]) && !hasDigit) {
            hasDigit = true;
            score += 5;
        }
        if (!hasSymbol) {
            for (int j = 0; j < specialChars.size(); j++) {
                if (password[i] == specialChars[j]) {
                    hasSymbol = true;
                    score += 10;
                    break;
                }
            }
        }
        if (i+1 <= password.size() && password[i] != password[i+1] && !hasUniqueChars) {
            uniqCharCount++;
            if (uniqCharCount == 5) {
                hasUniqueChars = true;
                score += 5;
            }
        }
    }

    std::cout << "Password Strength Rating: " << score << "/40." << std::endl;
    if (score < 10) {
        std::cout << "Password is: Very Weak" << std::endl;
    } else if (score < 20 && score >= 10) {
        std::cout << "Password is: Weak" << std::endl;
    } else if (score <= 35 && score >= 20) {
        std::cout << "Password is: Good" << std::endl;
    } else if (score > 35) {
        std::cout << "Password is: Strong" << std::endl;
    }
}

// *****************************************************************
// * Function Name: passGen(int length)                            *
// * Description: Generates password based on length parameter     *
// * Parameter Description: int length represents password length  *
// * Date: 05/14/2024                                              *
// * Author: Cristhian Prado                                       *
// * References:  x-engineer.org                                   *
// * - Used as reference for algorithm and general structure       *
// *****************************************************************
std::string passGen(int length) {
    // CHARACTER SET
    std::string lowCase = "abcdefghijklmnopqrstuvxyz";
    std::string upCase = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    std::string Numbers = "0123456789";
    std::string SpecialChar = "£$&()*+[]@#^-_!?%";

    std::string password = "";
    int charCategories = 4;
    srand(time(0));

    for (int i = 0; i < length; i++) {
        int chosenCharGroup = rand() % charCategories;
        switch (chosenCharGroup) {
            case 0: {
                int lowCaseSize = lowCase.size();   // cast to int
                int index = rand() % lowCaseSize;
                password += lowCase[index];
                break;
            }
            case 1: {
                int upCaseSize = upCase.size();
                int index = rand() % upCaseSize;
                password += upCase[index];
                break;
            }
            case 2: {
                int numSize = Numbers.size();
                int index = rand() % numSize;
                password += Numbers[index];
                break;
            }
            case 3: {
                int specCharSize = SpecialChar.size();
                int index = rand() % specCharSize;
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
