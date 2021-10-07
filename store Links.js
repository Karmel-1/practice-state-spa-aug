
{ title: "Pizza", text: "Pizza!" }
router.hooks({
    before: (done, params) => {
      const page = params && params.hasOwnProperty("page") ? capitalize(params.page) : "Home";
      if (page === "Home") {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st.%20louis`)
          .then(response => {
            state.Home.weather = {};
            state.Home.weather.city = response.data.name;
            state.Home.weather.temp = response.data.main.temp;
            state.Home.weather.feelsLike = response.data.main.feels_like;
            state.Home.weather.description = response.data.weather[0].main;
            done();
          })
          .catch(err => console.log(err));
      }
      if (page === "Pizza") {
        axios
          .get(`${process.env.PIZZA_PLACE_API_URL}`)
          .then(response => {
            state.Pizza.pizzas = response.data;
            done();
          })
          .catch(error => {
            console.log("It puked", error);
          });
      }
    }
  });
