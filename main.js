const form = document.querySelector('.form-section')
const description = document.getElementById('description')
const amount = document.getElementById('amount')
const type = document.getElementById('type')
const transaction = document.getElementById('transaction-list')
const expensesField = document.getElementById('expenses-value')
const incomesField = document.getElementById('incomes-value')
const balanceField = document.getElementById('balance-value')
const expenses = []
const incomes = []

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(!fieldsIsValid()) {
        return
    }
    createTransaction()
    expensesField.innerText = calculateExpenses()
    incomesField.innerText = calculateIncomes()
    totalBalance()
})

function errorMessage(field, message) {
    const div = document.createElement('div')
    div.innerText = message;
    div.classList.add('error-message')
    field.insertAdjacentElement('afterend', div)
}
function fieldsIsValid() {

    let valid = true

    for(let field of document.querySelectorAll('.validate')) {
        if(!field.value){
            errorMessage(field, `${field.ariaPlaceholder} não pode estar em branco`)
            valid = false;
        }
    }
    if(type.value === 'Selecione'){
        errorMessage(type, 'Selecione o tipo de transação')
    }
    return valid
}

function createTransaction() {
    const li = document.createElement('li')
    li.innerText = `${type.value} - ${description.value} R$ ${amount.value}`
    transaction.appendChild(li)

    if(type.value === 'Saida') {
        expenses.push(Number(amount.value))
    }
    if(type.value === 'Entrada') {
        incomes.push(Number(amount.value))
    }
}
function calculateExpenses() {
    const totalExpenses = expenses.reduce((acc, vlr) =>  acc + vlr, 0)
    return totalExpenses
}
function calculateIncomes() {
    const totalIncomes = incomes.reduce((acc, vlr) =>  acc + vlr, 0)
    return totalIncomes
}
function totalBalance() {
    const totalExpenses = calculateExpenses()
    const totalIncomes = calculateIncomes()
    const total = totalIncomes - totalExpenses
    balanceField.innerText = total
}