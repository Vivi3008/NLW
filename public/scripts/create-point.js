
function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]')

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")    
        .then( res => res.json())
        .then( states =>{
            for( uf of states){
                ufSelect.innerHTML +=`<option value="${uf.sigla}">${uf.nome}</option>`
            }
        })

}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector('select[name=city]')
    let stateInput = document.querySelector('input[name=state]')
    
    

    let indexOfselectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfselectedState].text

    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option>Selecione a cidade</option>'
    citySelect.disabled = true
    
    fetch(url)
        .then( res => res.json())
        .then( cities =>{
            for(city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })

}

document.querySelector('select[name=uf]')
        .addEventListener('change', getCities)



//ITENS DE COLETA
//pega todos os li
const itemsColected =  document.querySelectorAll('.items-grid li')

const inputItems = document.querySelector('input[name=items]')

for(items of itemsColected){
    items.addEventListener('click', handleSelectItems)
}

let selectedItems = []

function handleSelectItems(event){
    const itemSelected = event.target
    
    itemSelected.classList.toggle('selected')

    const itemId = itemSelected.dataset.id

    
    //verifica se existem itens selecionados se sim pega os itens selecionados
    const alredySelected = selectedItems.findIndex( item => item === itemId)

    //se ja estiver selecionado
    if(alredySelected>=0) {
        //tirar da selecao
        const filteredItems = selectedItems.filter( item => item != itemId)
        selectedItems = filteredItems
    } else {
        //se nao estiver selecionado adicionar ao array
        selectedItems.push(itemId)
    }
    
    //atualizar o campo escondido com os itens selecionados
    inputItems.value = selectedItems
}