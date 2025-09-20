const LoadCategories = () => {
  fetch(" https://taxi-kitchen-api.vercel.app/api/v1/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

const loadRandomFoods = () => {
  fetch(" https://taxi-kitchen-api.vercel.app/api/v1/foods/random")
    .then((res) => res.json())
    .then((data) => displayFoods(data.foods));
};

const loadFoodByCategory = (id) => {
  fetch(`https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`)
    .then((res) => res.json())
    .then((data) => displayFoods(data.foods));
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
        <div onclick="loadFoodByCategory(${category.id})" class="bg-white shadow rounded-lg cursor-pointer flex justify-start items-center mb-3 gap-1">
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
                <div onclick="loadFoodDetails(${food.id})" class="p-5 mb-5 bg-white flex gap-3 shadow rounded-xl">
                    <div class="img flex-1">
                        <img src="${food.foodImg}" alt=""
                            class="min-w-[160px] rounded-xl min-h-[160px] object-cover food-img">
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

                        <button class=" w-1/2 btn btn-warning">
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
