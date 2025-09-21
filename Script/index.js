const spinner = document.getElementById("spinner");
const showLoading = () => spinner.classList.remove("hidden");
const hideLoading = () => spinner.classList.add("hidden");

let cart = [];
let total = 0;

const LoadCategories = () => {
  showLoading();
  fetch(" https://taxi-kitchen-api.vercel.app/api/v1/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .finally(() => hideLoading());
};

const loadRandomFoods = () => {
  showLoading();
  fetch(" https://taxi-kitchen-api.vercel.app/api/v1/foods/random")
    .then((res) => res.json())
    .then((data) => displayFoods(data.foods))
    .finally(() => hideLoading());
};

const loadFoodByCategory = (id) => {
  const allBtns = document.querySelectorAll(".category-btn");
  console.log(allBtns);
  for (btn of allBtns) {
    btn.classList.remove("active");
  }

  const currentBtn = document.getElementById(`category-btn-${id}`);
  console.log(currentBtn);
  currentBtn.classList.add("active");

  const foodsContainer = document.getElementById("foods-container");
  foodsContainer.innerHTML = "";

  showLoading();
  fetch(`https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`)
    .then((res) => res.json())
    .then((data) => displayFoods(data.foods))
    .finally(() => hideLoading());
};

const loadFoodDetails = (id) => {
  const url = ` https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.details));
};
const displayCategories = (categories) => {
  //  1.get the container & empty
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";
  //   2.get every element using loop
  for (let category of categories) {
    // console.log(category);
    // 3.Create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <div id="category-btn-${category.id}" onclick="loadFoodByCategory(${category.id})" class="bg-white shadow rounded-lg cursor-pointer category-btn flex justify-start items-center mb-3 gap-1">
            <img class="w-16 py-1" src = ${category.categoryImg} alt="">
            <button class="cursor-pointer text-sm font-semibold">${category.categoryName}</button>
        </div>
    `;
    // 4.append element
    categoriesContainer.append(categoryDiv);
  }
};

const displayFoods = (foods) => {
  //   console.log(foods);

  const foodsContainer = document.getElementById("foods-container");
  foodsContainer.innerHTML = "";

  for (let food of foods) {
    // console.log(food);
    const foodDiv = document.createElement("div");
    //
    foodDiv.innerHTML = `
                <div  class="p-5 mb-5 bg-white flex gap-5 shadow rounded-xl">
                    <div onclick="loadFoodDetails(${food.id})" class="img flex-1">
                        <img src="${food.foodImg}" alt=""
                            class="min-w-[140px] rounded-xl min-h-[160px] object-cover food-img">
                    </div>
                    <div class="flex-2 flex flex-col justify-center">
                        <h1 class="text-xl font-bold food-title">
                            ${food.title}
                        </h1>
                        
                        <div class="badge badge-warning mt-1">${food.category}</div>

                        <div class="divider divider-end">
                            <h2 class="text-yellow-600 font-semibold">
                                $ <span class="food-price">${food.price}</span> BDT
                            </h2>
                        </div>

                        <button onclick="addToCart(this)" class=" btn btn-warning md:w-1/2">
                            <i class="fa-solid fa-square-plus"></i>
                            Add This Item
                        </button>
                    </div>
                </div>
          `;
    foodsContainer.append(foodDiv);
  }
};

const displayDetails = (food) => {
  console.log(food);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  
    <div class="space-y-4">
      <h1 class="text-2xl font-bold food-title">${food.title}</h1>
      <img class="max-h-[250px] w-full" src="${food.foodImg}"
            alt=""/>
      <div class="badge badge-primary">${food.area}</div>
       <a href="${food.video}" target="_blank" class="btn btn-warning">Watch Video</a>
    </div>

  `;
  document.getElementById("food-details-modal").showModal();
};

LoadCategories();
loadRandomFoods();

const addToCart = (btn) => {
  const foodCard = btn.parentNode.parentNode;
  const foodImg = foodCard.querySelector(".food-img").src;
  const foodTitle = foodCard.querySelector(".food-title").innerText;
  const foodPrice = Number(foodCard.querySelector(".food-price").innerText);

  const existingItem = cart.find((item) => item.foodTitle === foodTitle);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const selectedItem = {
      id: cart.length + 1,
      foodTitle: foodTitle,
      foodImg: foodImg,
      foodPrice: foodPrice,
      quantity: 1,
    };
    cart.push(selectedItem);
  }

  total = 0;
  cart.forEach((item) => (total += item.foodPrice * item.quantity));

  displayCart(cart);
  displayTotal(total);
  alert(`${foodTitle} add to card successfully`);
};

const displayTotal = (value) => {
  document.getElementById("total-price").innerHTML = value;
};

const displayCart = (cart) => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  for (item of cart) {
    const cartDiv = document.createElement("div");
    cartDiv.innerHTML = `
        <div class="flex items-center justify-between mb-4 mx-5 bg-gray-50 relative  p-3 rounded-xl shadow-sm">
            <div class="flex items-center space-x-3">
                <img src="${item.foodImg}" alt="Food" class="w-14 h-14 rounded-lg object-cover food-img">
                <div>
                    <h3 class="text-sm font-medium food-title">${item.foodTitle}</h3>
                    <p class="text-sm font-semibold text-yellow-600"><span>${item.quantity}</span> × $<span class="food-price">${item.foodPrice}</span> BDT</p>
                </div>
            </div>
            <button onclick="removeCart(this)" class="text-white w-8 h-8 bg-red-600 text-lg rounded-full cursor-pointer absolute top-1 right-1 font-bold"> <i class="fa-solid fa-xmark "></i></button>
        </div>
    `;
    cartContainer.append(cartDiv);
  }
};

const removeCart = (btn) => {
  const item = btn.parentNode;
  const foodTitle = item.querySelector(".food-title").innerText;

  const foodPrice = Number(item.querySelector(".food-price").innerText);
  console.log(foodPrice);
  // remove from cart
  cart = cart.filter((item) => item.foodTitle != foodTitle);

  // rest total
  total = 0;
  cart.forEach((item) => (total += item.foodPrice));

  displayCart(cart);
  displayTotal(total);
};
