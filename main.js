const KEY = '44698139a4c481d17cb6dbc1fc43ae58';

$('#search').click(function(){

    let city = $('#city').val();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`)
    .then(res => res.json())
    .then(data => {

        console.log(data);

        let icon = data.weather[0].icon;

        let temp = data.main.temp - 273.15;

        if (temp <= 0) {
            $('.wrap').css(
                'background',
                'linear-gradient(90deg, rgb(0,40,90) 0%, rgb(0,90,180) 50%, rgb(0,180,255) 100%)'
            );
        }
        else if (temp <= 25) {
            $('.wrap').css(
                'background',
                'linear-gradient(90deg, rgb(20,80,40) 0%, rgb(40,160,80) 50%, rgb(100,220,120) 100%)'
            );
        }
        else {
            $('.wrap').css(
                'background',
                'linear-gradient(90deg, rgb(255,120,0) 0%, rgb(255,180,0) 50%, rgb(255,60,60) 100%)'
            );
        }

        $('.weatherContainer').addClass('active');
        $('#resultContainer').addClass('active');

        $('#mainIcon').attr(
            'src',
            `https://openweathermap.org/img/wn/${icon}@2x.png`
        );

        $('#mainIcon').css('display', 'block');

        $('#resultContainer').empty();

        $('#resultContainer').append(`
            <div class="cityName">
                ${data.name}
            </div>

            <div class="country">
                ${data.sys.country}
                <img class="flag"
                src="https://flagsapi.com/${data.sys.country}/flat/32.png">
            </div>

            <div class="weatherItem">
                Температура: ${temp.toFixed(1)}°C
            </div>

            <div class="weatherItem">
                Вологість: ${data.main.humidity}%
            </div>

            <div class="weatherItem">
                Тиск: ${data.main.pressure} hPa
            </div>

            <div class="weatherItem">
                Вітер: ${data.wind.speed} м/с
            </div>
        `);

    });

});