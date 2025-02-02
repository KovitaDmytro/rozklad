// Завантаження таблиці з localStorage
function loadTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Очищаємо таблицю перед заповненням

    const tableData = JSON.parse(localStorage.getItem('tableData')) || [];

    // Якщо немає даних в localStorage, додаємо порожні рядки
    if (tableData.length === 0) {
        for (let i = 0; i < 10; i++) {
            tableData.push({ time: '', subject: '', zoom: '', group: '' });
        }
        localStorage.setItem('tableData', JSON.stringify(tableData));
    }

    // Виводимо всі рядки з tableData
    tableData.forEach((rowData, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="select-cell"><input type="radio" name="selectRow" value="${index}"></td>
            <td>${index + 1}</td>
            <td contenteditable="true">${rowData.time}</td>
            <td contenteditable="true">${rowData.subject}</td>
            <td contenteditable="true">${rowData.zoom}</td>
            <td contenteditable="true">${rowData.group}</td>
            <td>
                <button onclick="moveRow(${index}, 'up')">↑</button>
                <button onclick="moveRow(${index}, 'down')">↓</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Додати новий рядок
function addRow() {
    const time = document.getElementById("timeInput").value;
    const subject = document.getElementById("subjectInput").value;
    const zoom = document.getElementById("zoomInput").value;
    const group = document.getElementById("groupInput").value;

    if (time && subject && zoom && group) {
        const tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        tableData.push({ time, subject, zoom, group });
        localStorage.setItem('tableData', JSON.stringify(tableData)); // Зберігаємо зміни в localStorage
        loadTable(); // Завантажуємо таблицю
        clearInputs(); // Очищаємо поля вводу
    } else {
        alert('Заповніть всі поля!');
    }
}

// Видалити вибраний рядок
function deleteSelectedRow() {
    const selected = document.querySelector('input[name="selectRow"]:checked');
    if (selected) {
        const index = parseInt(selected.value);
        const tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        tableData.splice(index, 1); // Видаляємо вибраний рядок
        localStorage.setItem('tableData', JSON.stringify(tableData)); // Зберігаємо зміни в localStorage
        loadTable(); // Завантажуємо таблицю
    } else {
        alert('Виберіть рядок для видалення!');
    }
}

// Зберігати всі зміни після редагування
function saveAllChanges() {
    const rows = document.querySelectorAll('#dataTable tbody tr');
    const tableData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        tableData.push({
            time: cells[2].innerText,
            subject: cells[3].innerText,
            zoom: cells[4].innerText,
            group: cells[5].innerText,
        });
    });

    localStorage.setItem('tableData', JSON.stringify(tableData)); // Збереження змін в localStorage
    alert('Зміни збережено!');
}

// Переміщення рядка
function moveRow(index, direction) {
    const tableData = JSON.parse(localStorage.getItem('tableData')) || [];

    if (direction === 'up' && index > 0) {
        [tableData[index], tableData[index - 1]] = [tableData[index - 1], tableData[index]];
    } else if (direction === 'down' && index < tableData.length - 1) {
        [tableData[index], tableData[index + 1]] = [tableData[index + 1], tableData[index]];
    }

    localStorage.setItem('tableData', JSON.stringify(tableData)); // Зберігаємо зміни в localStorage
    loadTable(); // Завантажуємо таблицю
}

// Очищення полів вводу
function clearInputs() {
    document.getElementById("timeInput").value = '';
    document.getElementById("subjectInput").value = '';
    document.getElementById("zoomInput").value = '';
    document.getElementById("groupInput").value = '';
}

// Завантажуємо таблицю при завантаженні сторінки
window.onload = loadTable;

