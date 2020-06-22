const btnSearch = document.querySelector('#page-home main a')
const btnClose = document.querySelector('#modal .header a')
const modal = document.querySelector('#modal')


btnSearch.addEventListener('click', ()=>{
    modal.classList.remove('hidden')
})

btnClose.addEventListener('click', ()=>{
    modal.classList.add('hidden')
})
