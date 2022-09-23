let display = document.getElementById('display');

const getPokeData = (id) => { 
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then( res => res.json() )
            .then( data => data )
};

const renderCard = (pokemon) => {
    display.innerHTML += `<div class="card">
                            <span>${pokemon.id}</span>
                            <div class="card-img">
                                <img src=${pokemon.sprites.front_default} alt="pok">
                            </div>
                            <div class="card-info">
                                <div>Nombre: ${pokemon.name.toUpperCase()}</div>
                                <div>Tipo: ${checkType(pokemon.types[0].type.name)}</div>
                                <div>Poder: ${pokemon.base_experience}</div>
                            </div>
                          </div>`;
}; 

const renderPokeData = async () => { 
    for( let i = 1 ; i <= 151 ; i++){
        renderCard(await getPokeData(i));
    }
    //getPokeData(151).then(pok => renderCard(pok))
    renderEnd(); 
};

const renderEnd = () => {
    const loadingPanel =  document.querySelector('.loading')
    loadingPanel.classList.add('load-end');
    setTimeout(()=>{
        loadingPanel.style.display = 'none';
    },1100)
}

const checkType = (type) => {
    switch (type){
        case 'grass':
            return 'Hierba'
        case 'fire':
            return 'Fuego'  
        case 'water':
            return 'Agua'
        case 'bug':
            return 'Insecto'
        case 'normal':
            return 'Normal'
        case 'poison':
            return 'Veneno'  
        case 'electric':
            return 'Electricidad'
        case 'ground':
            return 'Tierra'
        case 'fighting':
            return 'Lucha'
        case 'psychic':
            return 'Psiquis'  
        case 'water':
            return 'Agua'
        case 'rock':
            return 'Piedra'
        case 'ghost':
            return 'Fantasma'
        case 'dragon':
            return 'Dragon' 
        case 'ice':
            return 'Hielo'                      
        default:
            return 'Desconocido'
    };
};

const searchFilter = (input, selector) => {
    document.addEventListener('keyup', (e) => {
        if(e.target.matches(input)){
            if(e.key === 'Escape') e.target.value = '';
            document.querySelectorAll(selector).forEach( element => {
                element.textContent.toLowerCase().includes(e.target.value) 
                ? element.classList.remove('filter')
                : element.classList.add('filter')
            });
        };
    });
};

const filterType = (type) => {
    document.querySelectorAll('.card').forEach( e => {
        e.classList.remove('filter');
        if (!e.textContent.toLowerCase().includes(type) && type !== 'Reset'){
            e.classList.add('filter');
        }
    });
}
const clearTypeFilter = (e) => {
    document.querySelectorAll('.radioState').forEach( e => {
        e.checked = false;    
    })
    filterType(e);
}

const typeFilter = document.querySelector('#typeFilter');
typeFilter.addEventListener('input', e =>{filterType(e.target.value)});

const reset = document.querySelector('#reset');
reset.addEventListener('click', (e) => {clearTypeFilter(e.target.value)})


renderPokeData();
searchFilter('.class-filter','.card');


 