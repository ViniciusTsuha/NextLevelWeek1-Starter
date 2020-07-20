function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    //fetch busca informações de um endereço; depois que 'voltar' do fecth, o then irá executar x função,
    //que no caso é o res de resposta do fetch. o res.json() transforma o arquivo em .json
    //o then seguinte irá utilizar o arquivo resultante do then interior, aplicando outra função.   
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //.then((res)=>{return res.json()})
    .then (res => res.json())
    .then (states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    //console.log(event.target.value)
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecionadade a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    //.then((res)=>{return res.json()})
    .then (res => res.json())
    .then (cities => {
        
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
        
    })
}


document
     .querySelector("select[name=uf]") 
     .addEventListener("change",getCities)


// Items de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    
    const itemLi = event.target
    // adicionar ou remover uma classe com javascript

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    // console.log('ITEM ID: ', itemId)

    // verificar se existem items selecionados, se sim
    // pegar os items selecionados
    
    const alreadySelect = selectedItems.findIndex(item =>{
        const itemFound = item == itemId //iso será true ou false
        return itemFound
    })

    // se já estiver selecionado, tirar da selecao

    if(alreadySelect >= 0){
        //tirar da selecao
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else{
        // se não estiver selecionado, adicionar à seleção
        //adicionar a seleção
        selectedItems.push(itemId)
    }

    // console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido com os itens selecionados//linha 59
    collectedItems.value = selectedItems
    
}