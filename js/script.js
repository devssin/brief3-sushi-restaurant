//Script for toggle the opening and closing of cart section
let cart = JSON.parse(localStorage.getItem('cart')) || []

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

const displayProducts = (products) => {
  const productContainer = document.querySelector('.products')
  productContainer.innerHTML = ''
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
                <span class="price">$${product.price}</span>
            </p>

            <div class="chose-qte">
                <button class="minus">-</button>
                <p class="qte">${product.qte}</p>
                <button class="plus"">+</button>
            </div>

            <button class="cta-main" >Add to cart</button>
            </div>
        </div>
    `
  })
}

const totalBtn = document.querySelector('.totalBtn')
totalBtn.addEventListener('click', () => {
  const total = document.querySelector('.totalText')
  let sum = 0
  cart.forEach((item) => {
    sum += item.price * item.qte
  })

  total.textContent = `$${sum}`
})
window.onload = function () {
  displayCart(cart)
  cartBtn.childNodes[3].textContent = cart.length
}
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
const foods = [
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
    categorie: 'Plates',
  },
  {
    id: 4,
    name: 'product 4',
    image: './img/product4-img.png',
    price: 230,
    rating: 4,
    qte: 1,
    categorie: 'Plates',
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
  {
    id: 7,
    name: 'product 7',
    image: './img/product7-img.png',
    price: 20,
    rating: 4,
    qte: 1,
    categorie: 'Drinks',
  },
  {
    id: 8,
    name: 'product 8',
    image: './img/product8-img.png',
    price: 20,
    rating: 4,
    qte: 1,
    categorie: 'Drinks',
  },
  {
    id: 9,
    name: 'product 9',
    image: './img/product9-img.png',
    price: 20,
    rating: 4,
    qte: 1,
    categorie: 'Drinks',
  },
]

displayProducts(foods)

const addToCartBtns = document.querySelectorAll('.cta-main')

let qte
const plusBtns = document.querySelectorAll('.plus')
plusBtns.forEach((btn, i) => {
  qte = 1
  btn.addEventListener('click', (e) => {
    qte++
    e.target.parentNode.childNodes[3].textContent = qte
  })
})

const minusBtns = document.querySelectorAll('.minus')
minusBtns.forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    if (qte > 1) {
      qte--

      e.target.parentNode.childNodes[3].textContent = qte
    }
  })
})

addToCartBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const selectedProduct = foods[index]

    const exists = cart.findIndex(({ id }) => id === selectedProduct.id)

    if (exists === -1) {
      cart.push(selectedProduct)
      cart[cart.length - 1].qte = qte
    } else {
      cart[exists].qte += qte
    }
    displayCart(cart)
    localStorage.setItem('cart', JSON.stringify(cart))
    cartBtn.childNodes[3].textContent = cart.length
    const toast = document.querySelector('.toast')
    document.querySelector('.toast > p').textContent = `${selectedProduct.name} added to cart`

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

const remove = (id) => {
  cart = cart.filter((item) => item.id !== id)
  displayCart(cart)
  cartBtn.childNodes[3].textContent = cart.length
  localStorage.setItem('cart', JSON.stringify(cart))
}

const selectCategories = document.getElementById('categories')
selectCategories.onchange = () => {
  if (selectCategories.value === 'all') {
    displayProducts(foods)
  } else {
    const selectedCategories = foods.filter(
      (food) =>
        food.categorie.toLocaleLowerCase() ===
        selectCategories.value.toLocaleLowerCase()
    )
    displayProducts(selectedCategories)
  }
}


