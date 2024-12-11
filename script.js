let tableData = JSON.parse(localStorage.getItem('tableData')) || [];

function loadTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Очищаємо таблицю перед заповненням

    if (tableData.length === 0) {
        for (let i = 0; i < 10; i++) {
            tableData.push({ time: '', group: '', subject: '', zoom: '' });
        }
        saveToLocalStorage();
    }

    tableData.forEach((rowData, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="select-cell"><input type="radio" name="selectRow" value="${index}"></td>
            <td>${index + 1}</td>
            <td contenteditable="true">${rowData.time}</td>
            <td contenteditable="true">${rowData.group}</td>
            <td contenteditable="true">${rowData.subject}</td>
            <td contenteditable="true">${rowData.zoom ? `<a href="${rowData.zoom}" target="_blank">${rowData.zoom}</a>` : ''}</td>
            <td>
                <button onclick="moveRow(${index}, 'up')">↑</button>
                <button onclick="moveRow(${index}, 'down')">↓</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


function addRow() {
    const time = document.getElementById("timeInput").value;
    const group = document.getElementById("groupInput").value;
    const subject = document.getElementById("subjectInput").value;
    const zoom = document.getElementById("zoomInput").value;

    if (time && group && subject && zoom) {
        tableData.push({ time, group, subject, zoom });
        saveToLocalStorage();
        loadTable();
        clearInputs();
    } else {
        alert('Заповніть всі поля!');
    }
}

function deleteSelectedRow() {
    const selected = document.querySelector('input[name="selectRow"]:checked');
    if (selected) {
        const index = parseInt(selected.value);
        tableData.splice(index, 1);
        saveToLocalStorage();
        loadTable();
    } else {
        alert('Виберіть рядок для видалення!');
    }
}

function saveAllChanges() {
    const rows = document.querySelectorAll('#dataTable tbody tr');
    tableData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        tableData.push({
            time: cells[2].innerText,
            group: cells[3].innerText,
            subject: cells[4].innerText,
            zoom: cells[5].innerText,
        });
    });

    saveToLocalStorage();
    alert('Зміни збережено!');
}

function moveRow(index, direction) {
    if (direction === 'up' && index > 0) {
        [tableData[index], tableData[index - 1]] = [tableData[index - 1], tableData[index]];
    } else if (direction === 'down' && index < tableData.length - 1) {
        [tableData[index], tableData[index + 1]] = [tableData[index + 1], tableData[index]];
    }

    saveToLocalStorage();
    loadTable();
}

function saveToLocalStorage() {
    localStorage.setItem('tableData', JSON.stringify(tableData));
}

function clearInputs() {
    document.getElementById("timeInput").value = '';
    document.getElementById("groupInput").value = '';
    document.getElementById("subjectInput").value = '';
    document.getElementById("zoomInput").value = '';
}

window.onload = loadTable;

