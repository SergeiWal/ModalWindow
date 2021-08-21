const fruits = [
    {id:1, price: 20, name: 'Apple', src: 'https://images2.alphacoders.com/719/719435.jpg'},
    {id:2, price: 30, name: 'Orange', src: 'https://cdn.pixabay.com/photo/2014/02/23/16/41/oranges-273024_1280.jpg'},
    {id:3, price: 56, name: 'Mango', src: 'https://newshay.com/wp-content/uploads/2021/03/mango.jpg'}
];

function _createFruitsCards(fruits = []){
    if(fruits.length === 0 ){
        return document.createElement('div');
    }

    var card = document.createElement('div');
    card.classList.add('row');

    fruits.forEach((fruit)=>{
        card.insertAdjacentHTML('afterbegin',`
            <div class="col">
                <div class="card" data-id=${fruit.id}>
                    <img src="${fruit.src}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${fruit.name}</h5>
                        <button class="btn btn-primary" data-price=${fruit.price}>Get price</button>
                        <button class="btn btn-danger" data-delete="true">Delete</button>
                    </div>
                </div>  
            </div>
        `);
    });
    document.querySelector('.container').appendChild(card);
}

function _deleteCard(id){
    var cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach((card)=>{
        if(card.dataset.id == id){
            card.parentElement.removeChild(card);
            return;
        }
    });
}


const priceModal = $.modal({
    title: 'Price',
    closable: true,
    content: `Price`,
    width: '300px',
    footerButtons: [
        {text:"OK", type:'primary', handler(){
            priceModal.close();
        }}
    ]
});

document.addEventListener('click',(event)=>{
    if(event.target.dataset.price){
        const id = event.target.parentNode.parentNode.dataset.id;
        const item = fruits.find(f=>f.id==id);
        priceModal.setContent(item.price)
        priceModal.open();
    }
    if(event.target.dataset.delete){
        const id = event.target.parentNode.parentNode.dataset.id;
        $.confirm({
            title: 'Delete',
            content: 'Are you want to delete this item?'
        }).then(()=>{
            _deleteCard(id);
            console.log("Remove");
        }).catch(()=>{
            console.log("Cancele");
        });
    }
   
});

window.addEventListener('load', (event)=>{
    _createFruitsCards(fruits);
});
