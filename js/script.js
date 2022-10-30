//Script for toggle the opening and closing of cart section
const cartBtn = document.querySelector('.cart')
const cartSection = document.querySelector('.cart-section')
const closeCartBtn = document.querySelector('.close-cart')
cartBtn.addEventListener('click', () => {
  cartSection.classList.toggle('open-cart')
})
closeCartBtn.addEventListener('click', () => {
  cartSection.classList.remove('open-cart')
})

//Script for adding products to the menu
const products = [
  {
    id: 1,
    name: 'product 1',
    image: './img/product-img.png',
    price: 20,
    rating: 4,
    qte: 1,
    categorie: 'Sushi',
  },
  {
    id: 2,
    name: 'product 2',
    image: './img/product2-img.png',
    price: 45,
    rating: 4,
    qte: 1,
    categorie: 'Sushi',
  },
  {
    id: 3,
    name: 'product 3',
    image: './img/product3-img.png',
    price: 50,
    rating: 4,
    qte: 1,
    categorie: 'Sushi',
  },
  {
    id: 4,
    name: 'product 4',
    image: './img/product4-img.png',
    price: 230,
    rating: 4,
    qte: 1,
    categorie: 'Sushi',
  },
  {
    id: 5,
    name: 'product 5',
    image: './img/product5-img.png',
    price: 50,
    rating: 4,
    qte: 1,
    categorie: 'Sushi',
  },
  {
    id: 6,
    name: 'product 6',
    image: './img/product6-img.png',
    price: 20,
    rating: 4,
    qte: 1,
    categorie: 'Sushi',
  },
]

let qte = 1
const productContainer = document.querySelector('.products')
products.forEach((product) => {
  console.log(product.name)
  productContainer.innerHTML += `
        <div class="product">
            <input type="hidden" value="${product.id}"/>
            <img src="${product.image}" alt="product-img" />
            <div class="product-info">
            <h5>${product.name}</h5>
            <p>
                <span class="rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                </span>
                <span class="price">${product.price}</span>
            </p>

            <div class="chose-qte">
                <button class="minus">-</button>
                <p class="qte">${product.qte}</p>
                <button class="plus">+</button>
            </div>

            <button class="cta-main" >Add to cart</button>
            </div>
        </div>
    `
})

const addToCartBtns = document.querySelectorAll('.cta-main')

const btnPlus = document.querySelectorAll('.plus')

btnPlus.forEach((plus, i) => {
  qte = 0
  plus.addEventListener('click', (e) => {
    qte++
    products[i].qte += qte
    e.target.previousElementSibling.textContent = products[i].qte.toString()
    qte = 0
  })
})

let cart = []
cartBtn.childNodes[3].textContent = cart.length

addToCartBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const selectedProduct = products[index]

    const exists = cart.findIndex(({ id }) => id === selectedProduct.id)

    if (exists === -1) {
      cart.push(selectedProduct)
    } else {
      cart[exists].qte += selectedProduct.qte

      selectedProduct.qte = 1
    }
    displayCart(cart)

    cartBtn.childNodes[3].textContent = cart.length
    const toast = document.querySelector('.toast')

    toast.classList.add('show-toast')
    const closeToast = document.querySelector('.close-toast')
    closeToast.addEventListener('click', () => {
      toast.classList.remove('show-toast')
    })
    setTimeout(() => {
      toast.classList.remove('show-toast')
    }, 3000)

   
  })
})
// const deleteBtns = document.querySelectorAll('.delete')
// console.log(deleteBtns)

// deleteBtns.forEach((btn, i) => {
//   btn.addEventListener('click', (e) => {
//     const id = parseInt(e.target.parentNode.childNodes[1].value)
//     cart = cart.filter((item) => item.id !== id)
//     // displayCart(cart)
//     console.log('clicked')
//     displayCart(cart)
//     console.log(cart)
//     btn.remove()
//     console.log(deleteBtns)
//   })
// })



const remove = (id) => {
    // id = parseInt(e.target.parentNode.childNodes[1].value)
    console.log(id)
    cart = cart.filter((item) => item.id !== id)
    // displayCart(cart)
    console.log('clicked')
    displayCart(cart)
}
const displayCart = (items) => {
  const cartItems = document.querySelector('.items')
  cartItems.innerHTML = ''

  if (!cart.length) {
    cartItems.innerHTML = '<p> Your cart is empty </p>'
  } else {
    items.map((item) => {
      cartItems.innerHTML += `
      <div class="item">
          <input type="hidden" value="${item.id}" />
          <img src="${item.image}" alt="product" />
  
          <div class="product-info">
          <h5 class="product-name">${item.name}</h5>
          <p class="product-price">$${item.price * item.qte}</p>
          </div>
          <div class="product-qte">x <span class="qte">${item.qte}</span></div>
  
          
          <i class="fas fa-minus delete" onclick = "remove(${item.id})"></i>
        
      </div>
      `
    })
  }
}

const removeItemFromCart = (i) => {
  const cartItems = document.querySelector('.items')
  cartItems.removeChild()
}
