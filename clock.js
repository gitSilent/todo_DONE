(function () {
    let divTodo = document.querySelector(".todo");
    let nowDay, nowMonth, nowYear, nowDayOfWeek;

    let timeNow = new Date();

    let divHours = document.createElement("div");
    let divDots = document.createElement("div");
    let divMinutes = document.createElement("div");
    let divDay = document.createElement("div");

    let divClock = document.createElement("div");
    divClock.classList.add("divClock")
    document.querySelector(".todo").before(divClock);

    function addClockDiv() {
        //добавление блока часов (часы,точки,минуты,дата)


        divHours.classList.add(`divHours`);
        divClock.append(divHours);

        divDots.setAttribute("id", "divDots");
        divClock.append(divDots);
        divDots.textContent = ":";

        divMinutes.classList.add(`divMinutes`);
        divClock.append(divMinutes);

        divDay.classList.add(`divDay`);
        divClock.append(divDay);

        startClock();
    }

    function startClock() {
        //ежесекундное обновление значений часов и мигание точек
        updateTime();
        setInterval(() => {
            timeNow = new Date();
            updateTime();
            divDots.classList.toggle("divDots");
        }, 1000);
    }

    function updateTime() {
        //функция коррекции отображения значений часов
        if (timeNow.getHours() < 10) {
            divHours.textContent = ` 0${timeNow.getHours()}`;
        } else {
            divHours.textContent = timeNow.getHours();
        }
        if (timeNow.getMinutes() < 10) {
            divMinutes.textContent = ` 0${timeNow.getMinutes()}`;
        } else {
            divMinutes.textContent = timeNow.getMinutes();
        }
    }

    function detectDay() {
        // функция определения даты и дня недели
        let now = new Date();
        let month = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "декабря",
        ];
        let weekDays = [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Cреда",
            "Четверг",
            "Пятница",
            "Суббота",
        ];
        nowDayOfWeek = weekDays[now.getDay()];
        nowMonth = month[now.getMonth()];
        nowYear = now.getFullYear();
        nowDay = now.getDate();
    }

    function fillDate() {
        // функция заполнения и обновления значений даты

        detectDay();
        divDay.textContent = `${nowDay} ${nowMonth} ${nowYear} г `;
        setInterval(() => {
            detectDay();
            divDay.textContent = `${nowDay} ${nowMonth} ${nowYear} г `;
            console.log("date updated");
        }, 60000);
    }
    function goClock(){
        addClockDiv();
        fillDate();
        
    }
window.clockApp = goClock;

})();

console.log("date here")
