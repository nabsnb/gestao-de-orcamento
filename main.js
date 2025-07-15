const form = document.querySelector('.form-section')
const description = document.getElementById('description')
const amount = document.getElementById('amount')
const type = document.getElementById('type')
const transactionList = document.getElementById('transaction-list')
const expensesField = document.getElementById('expenses-value')
const incomesField = document.getElementById('incomes-value')
const balanceField = document.getElementById('balance-value')
const transactions = []

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(!fieldsIsValid()) {
        return
    }
    createTransaction()
    clearFields()
    expensesField.innerText = calculateExpenses().toFixed(2)
    incomesField.innerText = calculateIncomes().toFixed(2)
    totalBalance()
    console.log(transactions)
})

function errorMessage(field, message) {
    const div = document.createElement('div')
    div.innerText = message;
    div.classList.add('error-message')
    field.insertAdjacentElement('afterend', div)
}

function fieldsIsValid() {
    
    let valid = true

    for(let errorMessage of form.querySelectorAll('.error-message')){
        errorMessage.remove()
    }
    
    for(let field of document.querySelectorAll('.validate')){
        if(!field.value){
            errorMessage(field, `${field.ariaPlaceholder} não pode estar em branco`)
            valid = false;
        }
    }
    if(type.value === 'Selecione'){
        errorMessage(type, 'Selecione o tipo de transação')
        valid = false;
    }
    if(amount.value <= 0){
        errorMessage(amount, 'Adicione um valor maior que 0')
        valid = false;
    }
    return valid
}
function getValues() {
    return {
        id: Date.now(),
        description: description.value,
        amount: Number(amount.value),
        type: type.value,
    }
}

function createTransaction() {
    
    const valuesUpdated = getValues()
    const li = document.createElement('li')
    const result = `${valuesUpdated.type} - ${valuesUpdated.description} R$ ${valuesUpdated.amount}`

    li.innerText = result
    transactionList.appendChild(li)
    transactions.push(valuesUpdated)
}

function clearFields() {
    amount.value = ''
    description.value = ''
    type.value = 'Selecione'
}

function calculateExpenses() {
    const transactionType = transactions.filter(transactions => transactions.type === 'Saida')
    const totalExpenses = transactionType.reduce((acc, amount) =>  acc + amount.amount, 0)
    return totalExpenses
}
function calculateIncomes() {
    const transactionType = transactions.filter(transactions => transactions.type === 'Entrada')
    const totalIncomes = transactionType.reduce((acc, amount) =>  acc + amount.amount, 0)
    return totalIncomes
}
function totalBalance() {
    const totalExpenses = calculateExpenses()
    const totalIncomes = calculateIncomes()
    const total = totalIncomes - totalExpenses
    balanceField.innerText = total.toFixed(2)
}