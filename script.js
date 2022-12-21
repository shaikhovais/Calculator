//------------------ Logic to calculate answer ----------------//
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') {
            return;
        }
        if(this.previousOperand !== '') {
            this.solve();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    solve() {
        let result;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previous) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '÷':
                result = previous / current;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = ''
    }

    //--- Logic to add ',' similar to real calculator e.g 1,341,561 ----//
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    
      updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
        }
      }
}

const numberButtons = document.querySelectorAll('[data-number');
const operationButtons = document.querySelectorAll('[data-operation');
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

let startNew = false;     //after pressing '=' if we want to start new instead of appending new number to previous output

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

//------------------ Add functions to every buttons ----------------//

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(startNew == true) {
            calculator.clear();
            startNew = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        startNew = false;
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button  => {
    calculator.solve();
    calculator.updateDisplay();
    startNew = true;
})

allClearButton.addEventListener('click', button  => {
    startNew = false;
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button  => {
    startNew = false;
    calculator.delete();
    calculator.updateDisplay();
})

//------------------ Adding 3d effects to buttons ----------------//
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.target.classList.add('clickedButton');
        setTimeout(() => e.target.classList.remove('clickedButton') ,100)
    })
    
})

//------------------ Logic to change theme ----------------//
const toggleBtn = document.getElementById("toggleIcon");
const updateThemeImg = document.querySelector('.update-theme-img');
const updateTheme = document.querySelector('.update-theme');

function moveObject(value) {
    updateThemeImg.style.transform = `translateY(${value})`;
}

function changedTheme() {
    setTimeout(() => moveObject('0'), 0);
    setTimeout(() => moveObject('100vh'), 800);
    // setTimeout(() => backDrop.style.display = 'none', 3000);
    setTimeout(() => updateTheme.style.display = 'none', 1500);
};
changedTheme()

toggleBtn.onclick = function (){

    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")) {
        updateThemeImg.src = './images/moon.png';
        updateTheme.style.display = 'flex';
        changedTheme();
        toggleBtn.src = "images/sun.png";
    } else {
        updateThemeImg.src = './images/sun.png';
        updateTheme.style.display = 'flex';
        changedTheme();
        toggleBtn.src = "images/moon.png";
    }
}
