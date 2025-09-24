// =====================
// Demo Cars Initialization
// =====================
let cars = JSON.parse(localStorage.getItem("cars")) || [
  {
    make: "Toyota",
    model: "Corolla",
    year: 2018,
    price: 15000,
    mileage: 45000,
    image: "https://cdn.pixabay.com/photo/2018/01/29/06/42/car-3112113_1280.jpg"
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2020,
    price: 20000,
    mileage: 25000,
    image: "https://cdn.pixabay.com/photo/2017/02/01/19/33/honda-2030343_1280.jpg"
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2019,
    price: 30000,
    mileage: 15000,
    image: "https://cdn.pixabay.com/photo/2016/04/19/11/47/ford-1330664_1280.jpg"
  },
  {
    make: "BMW",
    model: "X3",
    year: 2021,
    price: 45000,
    mileage: 12000,
    image: "https://cdn.pixabay.com/photo/2016/11/29/06/15/bmw-1868874_1280.jpg"
  }
];

// Save demo cars to localStorage if first load
if (!localStorage.getItem("cars")) {
  localStorage.setItem("cars", JSON.stringify(cars));
}

// =====================
// DOM References
// =====================
const carForm = document.getElementById("carForm");
const carsList = document.getElementById("carsList");

// =====================
// Render Cars
// =====================
function renderCars(filteredCars = cars) {
  carsList.innerHTML = "";
  if (filteredCars.length === 0) {
    carsList.innerHTML = "<p>No cars match your search.</p>";
    return;
  }

  filteredCars.forEach((car, index) => {
    const carCard = document.createElement("div");
    carCard.className = "car-card";
    carCard.innerHTML = `
      <img src="${car.image}" alt="${car.make} ${car.model}">
      <h3>${car.make} ${car.model} (${car.year})</h3>
      <p>💰 $${car.price} | 🚗 ${car.mileage} km</p>
      <button class="delete-btn" onclick="deleteCar(${index})">Delete</button>
    `;
    carsList.appendChild(carCard);
  });
}

// =====================
// Save Cars to LocalStorage
// =====================
function saveCars() {
  localStorage.setItem("cars", JSON.stringify(cars));
}

// =====================
// Add Car
// =====================
carForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCar = {
    make: document.getElementById("make").value,
    model: document.getElementById("model").value,
    year: Number(document.getElementById("year").value),
    price: Number(document.getElementById("price").value),
    mileage: Number(document.getElementById("mileage").value),
    image: document.getElementById("image").value,
  };

  cars.push(newCar);
  saveCars();
  renderCars();
  carForm.reset();
});

// =====================
// Delete Car
// =====================
function deleteCar(index) {
  cars.splice(index, 1);
  saveCars();
  renderCars();
}

// =====================
// Search & Filter
// =====================
function applyFilters() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;

  const filteredCars = cars.filter(car => {
    const matchesSearch =
      car.make.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm);

    const matchesMinPrice = minPrice ? car.price >= minPrice : true;
    const matchesMaxPrice = maxPrice ? car.price <= maxPrice : true;

    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  renderCars(filteredCars);
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  renderCars();
}

// =====================
// Sorting
// =====================
function applySort() {
  const sortValue = document.getElementById("sortSelect").value;
  let sortedCars = [...cars];

  if (sortValue === "price-asc") {
    sortedCars.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    sortedCars.sort((a, b) => b.price - a.price);
  } else if (sortValue === "year-desc") {
    sortedCars.sort((a, b) => b.year - a.year);
  } else if (sortValue === "year-asc") {
    sortedCars.sort((a, b) => a.year - b.year);
  }

  renderCars(sortedCars);
}

// =====================
// Initial Render
// =====================
renderCars();
