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

document.getElementById("date").innerHTML = day + ', ' +dayOfMonth + ' ' + month   ;
