// Load cars from localStorage or use default demo cars
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

// Save demo cars to localStorage if it's the first load
if (!localStorage.getItem("cars")) {
  localStorage.setItem("cars", JSON.stringify(cars));
}
