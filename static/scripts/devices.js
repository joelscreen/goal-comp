// Eco Bucket Table
const eco_bucket_table = document.getElementById("eco-bucket-table");

var items = JSON.parse(localStorage.getItem("items")) || [];
items = items.filter(item => getRemainingDays(item) > 0);

function renderTable() {
    eco_bucket_table.innerHTML = "";
    eco_bucket_table.innerHTML = `
        <tr>
            <th>Food</th>
            <th>No. of times wasted</th>
            <th>Average Waste</th>
        </tr>
    `;

    items.forEach((item, index) => {
        const remainingDays = getRemainingDays(item);

        const row = document.createElement("tr");

        var times_wasted = Math.floor(Math.random()*10)+1
        var avg_waste = 0;
        var total_waste = 0;
        var avg_waste_list = [];
        for (var i = 0; i < 7; i++) {
            waste_num = Math.floor(Math.random()*10);
            avg_waste_list.push(waste_num);
            total_waste += waste_num;
        }
        avg_waste = total_waste/7;
        avg_waste = avg_waste.toFixed(2);

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${times_wasted}</td>
            <td>${avg_waste}g</td>
        `;

        eco_bucket_table.appendChild(row);
    });
}

renderTable();

// Reduce Expriy Date
function getRemainingDays(item) {
    const now = Date.now();

    const daysPassed = Math.floor(
        (now - item.addedDate) / (1000 * 60 * 60 * 24)
    );

    return item.expiryDays - daysPassed;
}

items = items.filter(item => getRemainingDays(item) > 0);

localStorage.setItem("items", JSON.stringify(items));

// Freshness Info
const temperature_p = document.getElementById("temperature-p");
const humidity_p = document.getElementById("humidity-p");
const freshness_p = document.getElementById("freshness-p");

async function updateFreshness() {

    const response = await fetch('/get-freshness');

    const data = await response.json();

    if (data.temperature) {
        temperature_p.textContent = data.temperature;
    } else {
        temperature_p.textContent = "";
    }

    if (data.humidity) {
        humidity_p.textContent = data.humidity;
    } else {
        humidity_p.textContent = "";
    }

    if (data.freshness) {
        freshness_p.textContent = data.freshness;
    } else {
        freshness_p.textContent = "";
    }
}

updateFreshness();

setInterval(updateFreshness, 1000);
