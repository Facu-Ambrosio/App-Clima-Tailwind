const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a535854345msh88fdac3e6b0cbadp152f93jsnd563d889226a',
    'X-RapidAPI-Host': 'weather-api99.p.rapidapi.com'
  }
};

const getData = async (ciudad) => {
  let resp = await fetch(`https://weather-api99.p.rapidapi.com/weather?city=${ciudad}`, options)
  let data = await resp.json();
  console.log(data);
  return data;
};

const crearCard = async (param) => {
  let data = await getData(param.replace(/ /g, "%20"));
  let main = await data.main;
  let weather = await data.weather[0];
  let ciudad = await data.name;
  let pais = await data.sys.country;

  let temp = Math.round(main.temp - (273.15));
  let st = Math.round(main.feels_like - (273.15));;
  let icon = weather.icon;
  let humedad = main.humidity;

  let card = document.createElement("div");
  let section = document.getElementById("ciudades");

  card.classList.add("text-xl", "bg-slate-100", "box-border", "w-60", "rounded-3xl", "shadow-lg", "bg-opacity-40");
  card.innerHTML = `
  <div div class="flex flex-col items-center py-4" >
    <h5 class="font-black">${ciudad}, ${pais}</h5>
    <img src="./assets/${icon}.png" alt="">
    <p>
      Temperatura: ${temp} °C
    </p>
    <p>
      ST: ${st} °C
    </p>
    <p>
      Humedad: ${humedad}%
    </p>
  </div>
  `;
  section.append(card);

};

let form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let ciudad = document.getElementById("ciudad").value;
  await crearCard(ciudad);
  form.reset();
})