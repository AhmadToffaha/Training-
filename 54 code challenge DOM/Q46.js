
const data = [
  { name: "Ahmad toffaha", age: 25, city: "Ramallah" },
  { name: "Mona", age: 22, city: "Nablus" }
];

const table = document.createElement("table");
table.border = "1";

const headerRow = document.createElement("tr");
["name","age","city"].forEach(h => {
  const th = document.createElement("th");
  th.textContent = h.toUpperCase();
  headerRow.appendChild(th);
});
table.appendChild(headerRow);

data.forEach(row => {
  const tr = document.createElement("tr");
  ["name","age","city"].forEach(k => {
    const td = document.createElement("td");
    td.textContent = row[k];
    tr.appendChild(td);
  });
  table.appendChild(tr);
});

document.body.appendChild(table);
