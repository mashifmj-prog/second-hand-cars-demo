// Load cars from localStorage or start empty
let cars = JSON.parse(localStorage.getItem("cars")) || [];

const carForm = document.getElementById("carForm");
const carsList = document.getElementById("carsList");

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

function saveCars() {
  localStorage.setItem("cars", JSON.stringify(cars));
}

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

function deleteCar(index) {
  cars.splice(index, 1);
  saveCars();
  renderCars();
}

// Filtering logic
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

// Initial render
renderCars();
