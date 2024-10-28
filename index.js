let day;
let date = new Date();

// Отримуємо день тижня
switch (date.getDay()) {
    case 0:
        day = 'Неділя';
        break;
    case 1:
        day = 'Понеділок';
        break;
    case 2:
        day = 'Вівторок';
        break;
    case 3:
        day = 'Середа';
        break;
    case 4:
        day = 'Четвер';
        break;
    case 5:
        day = 'П’ятниця';
        break;
    case 6:
        day = 'Субота';
        break;
}

// Масив з назвами місяців
let months = ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];

// Отримуємо число місяця та сам місяць
let dayOfMonth = date.getDate();
let month = months[date.getMonth()]; // Отримуємо назву місяця

document.getElementById("date").innerHTML = day + ', ' +dayOfMonth + ' ' + month ;

let today = new Date();
let oneJan = new Date(today.getFullYear(), 0, 1);
let numberOfDays = Math.floor((today - oneJan) / (24 * 60 * 60 * 1000));
let week = Math.ceil((numberOfDays + 1) / 7);

// Перевірка на парність
if (week % 2 !== 0) {
    document.getElementById("rozklad-1").innerHTML = week;
} else {
    document.getElementById("rozklad-2").innerHTML = week;
}

function showWeek(weekNumber) {
    const week1 = document.getElementById('rozklad-1');
    const week2 = document.getElementById('rozklad-2');

    if (weekNumber === 1) {
        week1.style.display = 'block';
        week2.style.display = 'none';
    } else if (weekNumber === 2) {
        week1.style.display = 'none';
        week2.style.display = 'block';
    }
}


