let openShopping = document.querySelector('.shopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');



openShopping.addEventListener('click', () => {
    body.classList.add('active');
    document.querySelector('.card').style.overflowY = 'auto'; // เปิดการเลื่อน
    
});


let closeCardIcon = document.getElementById('Close-cart');

closeCardIcon.addEventListener('click', () => {
    body.classList.remove('active');
    document.querySelector('.card').style.overflowY = 'hidden';
});





let products = [
    {
        id: 1,
        name: 'HG GUNDAM AERIAL',
        image: '1.jpg',
        price: 650,
        currency: 'THB'
    },
    {
        id: 2,
        name: 'HG GUNDAM AERIAL REBUILD',
        image: '2.jpg',
        price: 770,
        currency: 'THB'
    },
    {
        id: 3,
        name: 'HG GUNDAM PHARACT',
        image: '3.jpg',
        price: 720,
        currency: 'THB'
    },
    {
        id: 4,
        name: 'HG DARILBALDE',
        image: '4.jpg',
        price: 650,
        currency: 'THB'
    },
    {
        id: 5,
        name: 'HG BEGUIR-PENTE',
        image: '5.jpg',
        price: 550,
        currency: 'THB'
    },
    {
        id: 6,
        name: 'HG MICHAELIS',
        image: '6.jpg',
        price: 550,
        currency: 'THB'
    },
    {
        id: 7,
        name: 'RG RX-78-2 GUNDAM',
        image: '7.jpg',
        price: 850,
        currency: 'THB'
    },
    {
        id: 8,
        name: 'RG AILE STRIKE GUNDAM',
        image: '8.jpg',
        price: 850,
        currency: 'THB'
    },
    {
        id: 9,
        name: 'RG MS-06F ZAKU II',
        image: '9.jpg',
        price: 850,
        currency: 'THB'
    }
];

let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">ใส่ตะกร้า</button>`;
        list.appendChild(newDiv);
    })
}

let buyButton = document.getElementById('buyButton');
let orderDataInput = document.getElementById('orderData');

buyButton.addEventListener('click', () => {
    // ตรวจสอบว่ามีสินค้าในตะกร้าหรือไม่
    if (listCards.length > 0) {
        // สร้างข้อมูลการสั่งซื้อ
        let orderData = JSON.stringify(listCards);

        // กำหนดข้อมูลการสั่งซื้อใน input field
        orderDataInput.value = orderData;

        // เปลี่ยนสีของปุ่มเมื่อถูกคลิก
        buyButton.classList.add('ordered');

    } else {
        alert('กรุณาเพิ่มสินค้าลงในตะกร้าก่อนทำการสั่งซื้อ');
    }
});

initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
        listCards[key].totalPrice = products[key].price;
    } else {
        listCards[key].quantity += 1;
        listCards[key].totalPrice += products[key].price;
    }
    reloadCard();
}


function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    let discountAmount = 0;

    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.totalPrice;
            count += value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()} ${value.currency}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    let originalTotalPrice = totalPrice;
    let discountedTotalPrice = totalPrice;

    if (totalPrice > 1000) {
        discountAmount = originalTotalPrice * 0.1;
        discountedTotalPrice = originalTotalPrice - discountAmount;
    }

    if (count > 0) {
        total.innerHTML = `ราคารวมทั้งหมด: ${discountedTotalPrice.toLocaleString()} ${listCards[0].currency}<br>(ลดไป: ${discountAmount.toLocaleString()} ${listCards[0].currency})`;
    } else {
        total.innerHTML = '';
    }

    quantity.innerText = count;

    let discountElement = document.querySelector('.discount');
    discountElement.innerHTML = '';
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].totalPrice = quantity * products[key].price;
    }
    reloadCard();
}


let popupContainer = document.getElementById('popupContainer');
let closePopupButton = document.getElementById('closePopup');
let orderForm = document.getElementById('orderForm');

buyButton.addEventListener('click', () => {
    popupContainer.style.display = 'flex';
    popupContainer.querySelector('.popup').classList.add('active');
});

closePopupButton.addEventListener('click', () => {
    popupContainer.querySelector('.popup').classList.remove('active');
    popupContainer.style.display = 'none';
    document.querySelector('.popup .total').innerHTML = `ยอดเงินที่ต้องชำระ: ${discountedTotalPrice.toLocaleString()} ${listCards[0].currency}`;
});

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // ดำเนินการกับข้อมูลในฟอร์มที่ส่งไป
    // นี่เป็นส่วนที่คุณต้องเขียนเพิ่มเติมเพื่อปรับแต่งการกรอกข้อมูลและการจัดการข้อมูล
    alert('การสั่งซื้อเสร็จสิ้น!'); // แสดงแจ้งเตือนเพื่อการตัวอย่าง
    popupContainer.style.display = 'none';
});