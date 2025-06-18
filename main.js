const form = document.querySelector('.form-section')
const description = document.getElementById('description')
const amount = document.getElementById('amount')
const type = document.getElementById('type')
const transaction = document.getElementById('transaction-list')
const expensesValue = document.getElementById('expenses-value')
const expensesField = document.getElementById('expenses-value')
const incomesField = document.getElementById('incomes-value')
const balanceField = document.getElementById('balance-value')
const expenses = []
const incomes = []

form.addEventListener('submit', (e) => {
    e.preventDefault()
    validateFields()
})

function createTransaction() {
    const li = document.createElement('li')
    li.innerText = `${type.value} - ${description.value} R$ ${amount.value}`
    transaction.appendChild(li)
}
function validateFields() {
    if(description.value === '' || amount.value === '' || type.value === 'Selecione') {
        console.log('Campos não podem estar vazios')
        return
    } else {
        addExpenses()
        addIncomes()
    }
}

function addExpenses() {
    if(type.value === 'Saida'){
        expenses.push(Number(amount.value))
        const totalExpenses = expenses.reduce((acc, vlr) =>  acc + vlr)
        expensesField.innerText = totalExpenses
        createTransaction()
    }

}

function addIncomes() {
    if(type.value === 'Entrada'){
        incomes.push(Number(amount.value))
        const totalIncomes = incomes.reduce((acc, vlr) =>  acc + vlr)
        incomesField.innerText = totalIncomes
        createTransaction()
    }

}
