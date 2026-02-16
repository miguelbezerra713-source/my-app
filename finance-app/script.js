// ================= NAVIGATION =================

function go(page){
    window.location.href = page;
}


// ================= SHEET SYSTEM =================

function createSheet(type) {
    let sheets = JSON.parse(localStorage.getItem("sheets")) || [];

    let name = prompt("Enter sheet name:");
    if (!name) return;

    sheets.push({
        name: name,
        type: type,
        content: ""
    });

    localStorage.setItem("sheets", JSON.stringify(sheets));
    loadSheets();
}

function loadSheets() {
    let sheets = JSON.parse(localStorage.getItem("sheets")) || [];

    let calcList = document.getElementById("calcList");
    let textList = document.getElementById("textList");

    if (!calcList || !textList) return;

    calcList.innerHTML = "";
    textList.innerHTML = "";

    sheets.forEach((sheet, i) => {
        let element = `
            <div class="card">
                <strong>${sheet.name}</strong>
                <button onclick="openSheet(${i})">Open</button>
                <button onclick="deleteSheet(${i})">Delete</button>
            </div>
        `;

        if (sheet.type === "calc") {
            calcList.innerHTML += element;
        } else {
            textList.innerHTML += element;
        }
    });
}

function deleteSheet(index) {
    let sheets = JSON.parse(localStorage.getItem("sheets"));
    sheets.splice(index, 1);
    localStorage.setItem("sheets", JSON.stringify(sheets));
    loadSheets();
}

function openSheet(index) {
    localStorage.setItem("currentSheet", index);
    window.location.href = "sheet-editor.html";
}



// ================= SHEET EDITOR =================

function loadEditor() {
    let sheets = JSON.parse(localStorage.getItem("sheets"));
    let index = localStorage.getItem("currentSheet");

    if (!sheets || index === null) return;

    let sheet = sheets[index];

    document.getElementById("sheetTitle").innerText = sheet.name;

    let area = document.getElementById("editorArea");

    if (sheet.type === "calc") {
        area.innerHTML = `
            <input type="number" id="num1" placeholder="Number 1">
            <input type="number" id="num2" placeholder="Number 2">
            <button onclick="calculate()">Calculate</button>
            <h3 id="result"></h3>
        `;
    } else {
        area.innerHTML = `
            <textarea id="editor"
                style="width:100%; height:250px; border-radius:10px; border:none; padding:10px;"></textarea>
            <button onclick="saveTextSheet()">Save</button>
        `;

        document.getElementById("editor").value = sheet.content;
    }
}

function loadEditor() {
    let sheets = JSON.parse(localStorage.getItem("sheets"));
    let index = localStorage.getItem("currentSheet");

    if (!sheets || index === null) return;

    let sheet = sheets[index];

    document.getElementById("sheetTitle").innerText = sheet.name;

    let area = document.getElementById("editorArea");

    if (sheet.type === "calc") {

        if (!sheet.content) {
            sheet.content = [];
            localStorage.setItem("sheets", JSON.stringify(sheets));
        }

        area.innerHTML = `
            <input type="number" id="newNumber" placeholder="Enter value">
            <button onclick="addNumber()">Add</button>

            <div id="numberList"></div>

            <h3 id="totalResult"></h3>
        `;

        renderNumbers();

    } else {
        area.innerHTML = `
            <textarea id="editor"
                style="width:100%; height:250px; border-radius:10px; border:none; padding:10px;"></textarea>
            <button onclick="saveTextSheet()">Save</button>
        `;

        document.getElementById("editor").value = sheet.content;
    }
}



function addNumber() {
    let sheets = JSON.parse(localStorage.getItem("sheets"));
    let index = localStorage.getItem("currentSheet");

    let value = parseFloat(document.getElementById("newNumber").value);

    if (isNaN(value)) return;

    sheets[index].content.push(value);

    localStorage.setItem("sheets", JSON.stringify(sheets));

    document.getElementById("newNumber").value = "";

    renderNumbers();
}



function renderNumbers() {
    let sheets = JSON.parse(localStorage.getItem("sheets"));
    let index = localStorage.getItem("currentSheet");

    let numbers = sheets[index].content;

    let list = document.getElementById("numberList");
    let total = 0;

    list.innerHTML = "";

    numbers.forEach((num, i) => {
        total += num;

        list.innerHTML += `
            <div class="card">
                ${num}
                <button onclick="removeNumber(${i})">X</button>
            </div>
        `;
    });

    document.getElementById("totalResult").innerText = "Total: " + total;
}



function removeNumber(i) {
    let sheets = JSON.parse(localStorage.getItem("sheets"));
    let index = localStorage.getItem("currentSheet");

    sheets[index].content.splice(i, 1);

    localStorage.setItem("sheets", JSON.stringify(sheets));

    renderNumbers();
}
// ================= LOGIN SYSTEM =================

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Fill all fields");
        return;
    }

    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
}

function checkLogin() {
    let logged = localStorage.getItem("loggedIn");

    if (logged !== "true") {
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker Registered"));
}