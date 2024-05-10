'use strict'

const todoLi = document.querySelector('.toDoList-container')
const input1 = document.querySelector('.input1')
const form1 = document.querySelector('.form1')
const add = document.querySelector('.submitBtn')
const uList = document.getElementById('ulList')

function addBtn(e) {
    e.preventDefault();
    e.stopPropagation();

    const list = document.createElement('li')
    const trash = document.createElement('i');
    const span = document.createElement('span');
    const form2 = document.createElement('form')
    const input2 = document.createElement('input')
    const btn1 = document.createElement('button')
    const check = document.createElement('input')
    const spanHolder = document.createElement('div')

    form2.classList.add('hidden')
    todoLi.appendChild(form2)
    form2.appendChild(input2)
    form2.appendChild(btn1)

    list.classList.add('list')

    trash.className = 'fas fa-trash-alt';
    trash.classList.add('trash')

    input2.type = 'text';
    input2.setAttribute('class', 'input2')
    input2.placeholder = 'activities......'

    btn1.type = 'submit';
    btn1.textContent = 'edit task'
    btn1.setAttribute('class', 'submitBtn')

    spanHolder.classList.add('spanHolder')

    check.type = 'checkbox';
    check.classList.add('check-box')

    span.textContent = input1.value;
    uList.appendChild(list)
    list.appendChild(spanHolder)
    list.appendChild(trash)
    spanHolder.appendChild(check)
    spanHolder.appendChild(span)

    trash.addEventListener('click', function () {
        list.remove()
    });


    span.addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        form2.classList.remove('hidden')
        form1.classList.add('hidden')
        input2.value = span.textContent;
        input2.focus()
    });
    btn1.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        span.textContent = input2.value;
        form2.classList.add('hidden')
        form1.classList.remove('hidden')
        uList.appendChild(list)
        list.appendChild(spanHolder)
        list.appendChild(trash)
        spanHolder.appendChild(check)
        spanHolder.appendChild(span)
    })
    let checkB = true;
    check.addEventListener('click', (e) => {
        e.stopPropagation()
        if (checkB) {
            span.classList.add('strick')
            checkB = false;
        } else {
            span.classList.remove('strick')
            checkB = true;
        }
    })

}
add.addEventListener('click', addBtn)

function inputFocus() {
    input1.focus()
}

document.addEventListener('keydown', function (e) {
    if (e.key === "Delete" && e.keyCode === 46) {
        input1.value = '';
        inputFocus()
    }
    if (e.keyCode === 32) {
        inputFocus()
    }
})

