// // clear the input fields values

function clearInputField(elementId) {
    document.getElementById(elementId).value = '';
}

// Validations involved in the calculation of saving amount

function saveValidation(savePercentage) {
    const errorField = document.getElementById('save-error');
    const income = document.getElementById('income-input').value;
    const balance = document.getElementById('balance').innerText;

    let con1 = isValidInput(income, 'income');
    let con2 = false;
    if (!isNaN(balance) && balance.length > 0) {
        console.log('Hree');
        con2 = true;
    }

    if (con1 && con2) {
        const savingAmount = (parseFloat(income) * savePercentage) / 100;
        if (savingAmount > parseFloat(balance)) {
            errorField.innerText = "* Insufficient fund. Savings cannot exceed balance.";
            return false;
        }
        else {
            errorField.innerText = "";
            return true;
        }
    }
    else {
        errorField.innerText = "* Income or balance is not set properly";
        return false;
    }
}


// // reset all fields 

function resetFields() {
    clearInputField('income-input');
    clearInputField('food-input');
    clearInputField('rent-input');
    clearInputField('cloths-input');
    clearInputField('save-input');


    document.getElementById('total-expenses').innerText = "";

    document.getElementById('balance').innerText = "";

    document.getElementById('saving-amount').innerText = "";

    document.getElementById('remaining-Balence').innerText = "";
}

// Checks validity of the user inputs
function isValidInput(input, element) {
    const errorField = document.getElementById(element + '-error');
    // not a number
    if (isNaN(input)) {
        errorField.innerText = "* Input value needs to be a number";
        return false;
    }
    else {

        // empty input field
        if (input.length == 0) {
            errorField.innerText = "* Input field cannot be empty";
            return false;
        }


        const value = parseFloat(input);
        // negative value
        if (value < 0) {
            errorField.innerText = "* Input value needs to be a positive number";
            return false;
        }
        else {
            // percentage value out of range
            if (element == 'save' && value > 100) {
                errorField.innerText = "* Percentage value needs to be inbetween 0 and 100";
                return false;
            }

            errorField.innerText = "";
            return true;
        }
    }
}


// Balance and expense calculation 



document.getElementById('calculate-button').addEventListener('click', function () {

    const income = document.getElementById('income-input').value;
    const food = document.getElementById('food-input').value;
    const rent = document.getElementById('rent-input').value;
    const cloths = document.getElementById('cloths-input').value;

    const con1 = isValidInput(income, 'income');
    const con2 = isValidInput(food, 'food');
    const con3 = isValidInput(rent, 'rent');
    const con4 = isValidInput(cloths, 'clothes');

    if (con1 && con2 && con3 && con4) {
        const expenses = parseFloat(food) + parseFloat(rent) + parseFloat(cloths);

        const errorField = document.getElementById('debit-credit-error');
        if (expenses > parseFloat(income)) {
            errorField.innerText = "* Your expense cannot exceed your total income."
        }
        else {
            errorField.innerText = "";
            document.getElementById('total-expenses').innerText = expenses;
            const balance = parseFloat(income) - expenses;

            document.getElementById('balance').innerText = balance;
        }
    }
})



// Savings and remainingBalance calculation

document.getElementById('save-button').addEventListener('click', function () {
    let savePercentage = document.getElementById('save-input').value;

    if (isValidInput(savePercentage, 'save'));

    savePercentage = parseFloat(savePercentage);

    if (saveValidation(savePercentage)) {
        const income = document.getElementById('income-input').value;

        const balance = parseFloat(document.getElementById('balance').innerText);

        const savingAmount = (income * savePercentage) / 100;

        document.getElementById('saving-amount').innerText = savingAmount;

        const remainingBalance = balance - savingAmount;

        document.getElementById('remaining-Balance').innerText = remainingBalance;
    }
})