// ==========================
// Demo Cars (with absolute GitHub image paths)
// ==========================
let cars = [
  {
    make: "Toyota",
    model: "Corolla",
    year: 2018,
    price: 15000,
    mileage: 45000,
    image: "https://mashifmj-prog.github.io/second-hand-cars-demo/images/toyota.jpg"
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2020,
    price: 20000,
    mileage: 25000,
    image: "https://mashifmj-prog.github.io/second-hand-cars-demo/images/honda.jpg"
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2019,
    price: 30000,
    mileage: 15000,
    image: "https://mashifmj-prog.github.io/second-hand-cars-demo/images/1-ford.jpg"
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2019,
    price: 30000,
    mileage: 12000,
    image: "https://mashifmj-prog.github.io/second-hand-cars-demo/images/ford.jpg"
  },
  {
    make: "BMW",
    model: "X3",
    year: 2021,
    price: 45000,
    mileage: 12000,
    image: "https://mashifmj-prog.github.io/second-hand-cars-demo/images/bmw.jpg"
  }
];

// ==========================
// Always reset demo cars on load (ignores old localStorage)
// ==========================
localStorage.setItem("cars", JSON.stringify(cars));
cars = JSON.parse(localStorage.getItem("cars"));

// ==========================
// Render Cars
// ==========================
function renderCars(carsToRender = cars) {
  const carsList = document.getElementById("carsList");
  carsList.innerHTML = "";

  if (carsToRender.length === 0) {
    carsList.innerHTML = "<p>No cars found.</p>";
    return;
  }

  carsToRender.forEach((car, index) => {
    const carCard = document.createElement("div");
    carCard.classList.add("car-card");

    carCard.innerHTML = `
      <img src="${car.image}" alt="${car.make} ${car.model}" onerror="this.src='https://mashifmj-prog.github.io/second-hand-cars-demo/images/placeholder.jpg'">
      <h3>${car.make} ${car.model}</h3>
      <p>Year: ${car.year}</p>
      <p>Price: $${car.price.toLocaleString()}</p>
      <p>Mileage: ${car.mileage.toLocaleString()} km</p>
      <button onclick="deleteCar(${index})">Delete</button>
    `;

    carsList.appendChild(carCard);
  });
}

// ==========================
// Add Car
// ==========================
document.getElementById("carForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const make = document.getElementById("make").value;
  const model = document.getElementById("model").value;
  const year = parseInt(document.getElementById("year").value);
  const price = parseFloat(document.getElementById("price").value);
  const mileage = parseInt(document.getElementById("mileage").value);
  const image = document.getElementById("image").value;

  const newCar = { make, model, year, price, mileage, image };

  cars.push(newCar);
  localStorage.setItem("cars", JSON.stringify(cars));

  renderCars();
  this.reset();
});

// ==========================
// Delete Car
// ==========================
function deleteCar(index) {
  cars.splice(index, 1);
  localStorage.setItem("cars", JSON.stringify(cars));
  renderCars();
}

// ==========================
// Filters
// ==========================
function applyFilters() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

  const filteredCars = cars.filter(
    car =>
      (car.make.toLowerCase().includes(search) ||
        car.model.toLowerCase().includes(search)) &&
      car.price >= minPrice &&
      car.price <= maxPrice
  );

  renderCars(filteredCars);
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  document.getElementById("sortSelect").value = "";
  renderCars();
}

// ==========================
// Sorting
// =====================
