// ==========================
// Demo Cars (simplest working version)
// ==========================
let cars = [
  {
    make: "Toyota",
    model: "Corolla",
    year: 2018,
    price: 15000,
    mileage: 45000,
    image: "images/toyota.jpg"
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2020,
    price: 20000,
    mileage: 25000,
    image: "images/honda.jpg"
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2019,
    price: 30000,
    mileage: 15000,
    image: "images/ford.jpg" // original working image
  },
  {
    make: "BMW",
    model: "X3",
    year: 2021,
    price: 45000,
    mileage: 12000,
    image: "images/bmw.jpg"
  }
];

// ==========================
// Always reset demo cars on load
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
      <img src="${car.image}" alt="${car.make} ${car.model}" onerror="this.src='images/placeholder.jpg'">
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
  localStorage.setItem("cars", JSON.strin
