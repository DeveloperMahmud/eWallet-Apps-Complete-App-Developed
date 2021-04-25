

//UI

showItems();

function showItems(){
    let items = getItemsFromLS();
    const collection = document.querySelector('.collection');

    for(let item of items){
        const  newHtml = ` 
    <div class="item">
        <div class="item-description-time">
            <div class="item-description">
                <p>${item.desc}</p>
            </div>
            <div class="item-time">
                <p>${item.time}</p>
            </div>
        </div>
        <div class="item-amount ${item.type=== '+'?'income-amount':'expense-amount'}">
            <p>${item.type}$${sep(item.value)}</p>
        </div>
    </div>
    `;

    collection.insertAdjacentHTML('afterbegin', newHtml);

    }

};


document.querySelector('#ewallet-form').addEventListener('submit', function(e){
    e.preventDefault();

    const type = document.querySelector('.add__type').value;
    const desc = document.querySelector('.add__description').value;
    const value = document.querySelector('.add__value').value;
    
    if(desc && value){
        addItems(type,desc,value);
        resetForm();
    }
});

function addItems(type,desc,value){

    const time = getFormattedTime();
    const  newHtml = ` 
    <div class="item">
        <div class="item-description-time">
            <div class="item-description">
                <p>${desc}</p>
            </div>
            <div class="item-time">
                <p>${time}</p>
            </div>
        </div>
        <div class="item-amount ${type=== '+'?'income-amount':'expense-amount'}">
            <p>${type}$${sep(value)}</p>
        </div>
    </div>`

    const collection = document.querySelector('.collection').insertAdjacentHTML('afterBegin',newHtml);


    addItemsToLS(desc,time,type,value);

    showTotalIncome();
    showTotalExpense();
    showTotalBalance();
}

function resetForm(){
    const type = document.querySelector('.add__type').value = '+';
    const desc = document.querySelector('.add__description').value = '';
    const value = document.querySelector('.add__value').value='';
}

//  ****************************************************************
//  *** Local Storage *****************************************
//  ****************************************************************
function getItemsFromLS(){

    let items = localStorage.getItem('items');
    
    return (items) ? JSON.parse(items) : [];

    // if(items){
    //     items = JSON.parse(items);
    // }else{
    //     items = [];
    // }
    // return items;
    
};

function addItemsToLS(desc,time,type,value){

    let items = getItemsFromLS();
    items.push({desc,time,type,value});
    localStorage.setItem('items', JSON.stringify(items));
}





//**********************************
//Utility Functions*************
// **********************************
function getFormattedTime()
{
    const now = new Date().toLocaleTimeString('en-us', {
        month:'short',
        day:'numeric',
        hour:'2-digit',
        minute:'2-digit',
    });
    const date = now.split(',')[0].split(' ');
    const time = now.split(',')[1];
    return`${date[1]} ${date[0]},${time}`;
};
//********************************
//**********calculations
// ******************************
showTotalIncome();
showTotalExpense();
showTotalBalance();

function showTotalIncome(){
    let items = getItemsFromLS();
    let totalIncome = 0;
    for(let item of items){
        if(item.type === '+'){
            totalIncome += parseInt(item.value);
        }
    }
    console.log(totalIncome);
    document.querySelector('.income__amount p').innerText = `$${sep(totalIncome)}`;
};


function showTotalExpense(){
    let items = getItemsFromLS();
    let totalExpense = 0;
    for(let item of items){
        if(item.type === '-'){
            totalExpense += parseInt(item.value);
        }
    }
    console.log(totalExpense);
    document.querySelector('.expense__amount p').innerText = `$${sep(totalExpense)}`;
};


function showTotalBalance(){
    let items = getItemsFromLS();
    let balance = 0;
    for(let item of items){
        if(item.type==='+'){
            balance+= parseInt(item.value);
        }else{
            balance -= parseInt(item.value);
        }
    }
    console.log(balance);   
    document.querySelector('.balance__amount p').innerText = `$${sep(balance)}`;
    
    document.querySelector('header').className = balance >=0? 'green' : 'red';

    // if(balance >= 0){
    //     document.querySelector('header').className = 'green';
    // }else{
    //     document.querySelector('header').className = 'red';
    // }
};

function sep(amount){
    amount=parseInt(amount);
    return amount.toLocaleString();
}









