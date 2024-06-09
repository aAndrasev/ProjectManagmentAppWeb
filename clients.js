let clientsroute = baseRoute + "clients";

function GetClients(request) {
  fetch(clientsroute + "/getall", {
    headers: {
      "Content-Type": "application/json",
      Authorization: Auth(),
    },
    method: "POST",
    body: JSON.stringify(request),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  })
  .then((data) => {
    console.log("Fetched clients: ", data); 
    ShowClients(data);
  })
  .catch((err) => {
    console.error("Error fetching clients:", err);
  });  
}

function ShowClients(clients) {
  let data = document.getElementById("clientData");
  data.innerHTML = "";
  displayClients(clients);
}

function displayClients(clients) {
  jwt = localStorage.getItem("jwt");
  let data = document.getElementById("clientData");
  data.innerHTML = ""; 
  
  let tableContainer = document.createElement("div");
  tableContainer.classList.add("table-container");

  let table = document.createElement("table");
  table.classList.add("table", "table-striped", "table-sm");

  let thead = document.createElement("thead");
  thead.style.backgroundColor = "#5D7050";
  thead.classList.add("text-center");
  thead.style.borderBottom = "2px solid black";
  let tr = document.createElement("tr");

  let thName = document.createElement("th");
  thName.innerText = "Name";
  thName.style.border = "2px solid black";
  let thPlace = document.createElement("th");
  thPlace.innerText = "Place";
  thPlace.style.border = "2px solid black";
  let thEmail = document.createElement("th");
  thEmail.innerText = "Email";
  thEmail.style.border = "2px solid black";
  let thPhoneNumber = document.createElement("th");
  thPhoneNumber.innerText = "Phone number";
  thPhoneNumber.style.border = "2px solid black";

  tr.append(thName, thPlace,  thEmail, thPhoneNumber);

  if (jwt) {
    let thAction = document.createElement("th");
    thAction.innerText = "Action";
    thAction.style.border = "2px solid black";
    tr.appendChild(thAction);
  }

  thead.appendChild(tr);
  table.appendChild(thead);

  let tbody = document.createElement("tbody");
  tbody.classList.add("custom-border");
  tbody.style.textAlign = "center";
  tbody.style.border = "2px solid black";
  
  if (Array.isArray(clients)) {
  for (let x of clients) {
    let tr = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.innerText = x.name;
    tdName.style.border = "2px solid black";

    let tdPlace = document.createElement("td");
    tdPlace.innerText = x.place;
    tdPlace.style.border = "2px solid black";

    let tdEmail = document.createElement("td");
    tdEmail.innerText = x.email;
    tdEmail.style.border = "2px solid black";

    let tdPhoneNumber = document.createElement("td");
    tdPhoneNumber.innerText = x.phoneNumber;
    tdPhoneNumber.style.border = "2px solid black";

    tr.append(tdName, tdPlace, tdEmail, tdPhoneNumber);

    if (jwt) {
      let tdAction = document.createElement("td");
      tdAction.classList.add("text-center");
      tdAction.style.border = "2px solid black";
      
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.type = "button";
      deleteButton.id = x.id;
      deleteButton.classList.add("btn", "btn-outline-danger");
      deleteButton.addEventListener("click", DeleteClient);

      let editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.type = "button";
      editButton.id = x.id;
      editButton.classList.add("btn","btn-outline-info");
      editButton.style.width = "70px"; 
      editButton.addEventListener("click", EditClient);
      
      tdAction.append(editButton, deleteButton);
      tr.appendChild(tdAction);
    }
    tbody.appendChild(tr);
  }
 }
  table.appendChild(tbody);
  tableContainer.appendChild(table);
  data.appendChild(tableContainer);
  
}
/*function GetProjectStatuses() {
  let projectStatusesroute = projectsroute + "/GetProjectStatuses"
  fetch(projectStatusesroute)
    .then((res) => {
      if (res.ok) {
        res.json().then(ShowProjectStatuses);
      } else {
        alert(`Error during fetching ProjectStatuses! ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
}
function ShowProjectStatuses(projectStatuses) {
  let select = document.getElementById("projectStatusId");
 
  
if (select.children.length === 0) {  
  let allOption = document.createElement("option");
  allOption.text = "Show All";
  allOption.value = 0;
  select.appendChild(allOption);

  for (const x of projectStatuses) {
    let option = document.createElement("option");
    option.innerText = x.name;
    option.value = x.id;
    select.appendChild(option);
  }
}
}*/
function SaveClient() {
  let id = parseInt(document.getElementById("clientId").value, 10);
  let name = document.getElementById("clientName").value;
  let place = document.getElementById("clientPlace").value;
  let email = document.getElementById("clientEmail").value;
  let phoneNumber = parseInt(document.getElementById("clientPhoneNumber").value, 10);
  
  let clientModel = {
    id: id,
    name: name,
    place: place,
    email: email,
    phoneNumber: phoneNumber,
  };

  if (id != null && id > 0) {
    // Call PUT method - method requires clientModel & ID route is /api/clients/{id}
    fetch(clientsroute + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientModel)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update client');
      }
      return response.json();
    })
    .then(data => {
      ShowClientsPage();
    })
    .catch(error => {
      console.error(error);
      // Handle error appropriately, e.g., show error message to user
    });
  } else {
    // Call POST method - method requires clientModel route is /api/clients
    fetch(clientsroute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clientModel)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create client');
      }
      return response.json();
    })
    .then(data => {
      ShowClientsPage();
    })
    .catch(error => {
      console.error(error);
      // Handle error appropriately, e.g., show error message to user
    });
  }
}

function DeleteClient() {
  let clientid = this.id;
  fetch(clientsroute + `/${clientid}`, {
    method: "DELETE",
    headers: { Authorization: Auth() },
  })
    .then((res) => {
      if (res.ok) {
        GetClients(new Object());
        ResetForm();
      } else {
        alert("Error during delete attempt!");
      }
    })
    .catch((errors) => console.log(errors));
 }
 function EditClient(){
  let clientid = this.id;
  fetch(clientsroute + `/${clientid}`, {
    method: "GET",
    headers: { Authorization: Auth() },
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  })
  .then((data) => {
    console.log("Fetched clients: ", data); 
    MapToClient(data);
  })
    .catch((errors) => console.log(errors));
  ShowClientDetailPage();
  hideClientRefreshButton();
 }
 function SearchClient() {
  let searchClientFieldInput = document.getElementById("searchClientFieldInput"); 
    let body = {
      searchTerm: searchClientFieldInput.value
    };

    let filteredClients = GetClients(body);
    displayClients(filteredClients );
 }
 function AddClient() {
  Refresh();
  ShowClientDetailPage();
  showClientRefreshButton();
 }
 function MapToClient(data){
  document.getElementById("clientName").value = data.name;
  document.getElementById("clientId").value = data.id;
  document.getElementById("clientPlace").value = data.place;
  document.getElementById("clientEmail").value = data.email;
  document.getElementById("clientPhoneNumber").value = data.phoneNumber;
 }