let longitud;
let latitud;
let temperatura = document.querySelector(".temperatura");
let descripcion = document.querySelector(".descripcion");
let ubicacion = document.querySelector(".ubi");
let imagen = document.querySelector(".imagen");
const kelvin = 273.15;

window.addEventListener("load", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            longitud = position.coords.longitude;
            latitud = position.coords.latitude;
            const api_key = "da37d295703cc254fdec5629780887dc";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${api_key}`;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => { 
                    
                    console.log(data);
                    temperatura.textContent = Math.floor(data.main.temp - kelvin) + "°C";
                    descripcion.textContent = data.weather[0].description; 
                    ubicacion.textContent = data.name + "," + data.sys.country;


                    const iconCode = data.weather[0].icon;
                    iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
                    imagen.src = iconUrl;
                    console.log(iconUrl)
                    console.log(iconCode)


                })
                .catch((error) => {
                    console.error("Error al obtener los datos del clima");
                });
        });
    } else {
        console.error("Geolocalización no es compatible en este navegador.");
    }
});