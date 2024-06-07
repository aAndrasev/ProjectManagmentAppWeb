let researchersroute = baseRoute + "researchers";

function GetResearchers(request) {
  fetch(researchersroute + "/getall", {
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
    console.log("Fetched researchers: ", data); 
    ShowResearchers(data);
  })
  .catch((err) => {
    console.error("Error fetching researchers:", err);
  });  
}

function ShowResearchers(researchers) {
  let data = document.getElementById("researcherData");
  data.innerHTML = "";
  displayResearchers(researchers);
}

function displayResearchers(researchers) {
  jwt = localStorage.getItem("jwt");
  let data = document.getElementById("researcherData");
  data.innerHTML = ""; 
  
  let tableContainer = document.createElement("div");
  tableContainer.classList.add("table-container");

  let table = document.createElement("table");
  table.classList.add("table", "table-striped", "table-sm");

  let thead = document.createElement("thead");
  thead.style.backgroundColor = "#5ced73";
  thead.classList.add("text-center");
  thead.style.borderBottom = "2px solid black";
  let tr = document.createElement("tr");

  let thName = document.createElement("th");
  thName.innerText = "Name";
  let thLastName = document.createElement("th");
  thLastName.innerText = "Last name";
  let thRole = document.createElement("th");
  thRole.innerText = "Role";
  let thEmail = document.createElement("th");
  thEmail.innerText = "Email";
  let thPhoneNumber = document.createElement("th");
  thPhoneNumber.innerText = "Phone number";

  tr.append(thName, thLastName, thRole, thEmail, thPhoneNumber);

  if (jwt) {
    let thAction = document.createElement("th");
    thAction.innerText = "Action";
    tr.appendChild(thAction);
  }

  thead.appendChild(tr);
  table.appendChild(thead);

  let tbody = document.createElement("tbody");
  tbody.classList.add("custom-border");
  tbody.style.textAlign = "center";
  tbody.style.border = "2px solid black";
  
  if (Array.isArray(researchers)) {
  for (let x of researchers) {
    let tr = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.innerText = x.name;
    tdName.style.border = "2px solid black";

    let tdLastName = document.createElement("td");
    tdLastName.innerText = x.lastName;
    tdLastName.style.border = "2px solid black";

    let tdTitle = document.createElement("td");
    tdTitle.innerText = x.researcherRoleName;
    tdTitle.style.border = "2px solid black";

    let tdEmail = document.createElement("td");
    tdEmail.innerText = x.email;
    tdEmail.style.border = "2px solid black";

    let tdPhoneNumber = document.createElement("td");
    tdPhoneNumber.innerText = x.phoneNumber;
    tdPhoneNumber.style.border = "2px solid black";

    tr.append(tdName, tdLastName, tdTitle, tdEmail, tdPhoneNumber);

    if (jwt) {
      let tdAction = document.createElement("td");
      tdAction.classList.add("text-center");
      tdAction.style.border = "2px solid black";
      
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.type = "button";
      deleteButton.id = x.id;
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.addEventListener("click", DeleteResearcher);

      let editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.type = "button";
      editButton.id = x.id;
      editButton.classList.add("btn", "btn-warning");
      editButton.style.width = "70px"; 
      editButton.addEventListener("click", EditResearcher);
      
      tdAction.append(editButton, deleteButton);
      tr.appendChild(tdAction);
    }
    tbody.appendChild(tr);
  }
 }
  table.appendChild(tbody);
  tableContainer.appendChild(table);
  data.appendChild(tableContainer);
  GetResearcherRoles('researcherRoleId'); 
}
function GetResearcherRoles(elementId) {
  let researcherRolesroute = researchersroute + "/GetResearcherRoles"
  fetch(researcherRolesroute)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    }) 
    .then((data) => {
      console.log("Fetched clients: ", data); 
      ShowResearcherRoles(data, elementId);
    })
    .catch((err) => console.log(err));
}
function ShowResearcherRoles(researcherRoles, elementId) {
  let select = document.getElementById(elementId);
  
if (select.children.length === 0) {  
  let allOption = document.createElement("option");
  allOption.text = "Show All";
  allOption.value = 0;
  select.appendChild(allOption);

  for (const x of researcherRoles) {
    let option = document.createElement("option");
    option.innerText = x.name;
    option.value = x.id;
    select.appendChild(option);
  }
}
}
function SaveResearcher(){
  let id = parseInt(document.getElementById("researcherId").value, 10);
  let name = document.getElementById("researcherName").value;
  let lastName = document.getElementById("researcherLastName").value;
  let title = document.getElementById("researcherTitle").value;
  let researcherRole = document.getElementById("researcherRoleEdit").value;
  let email = document.getElementById("researcherEmail").value;
  let phoneNumber = parseInt(document.getElementById("researcherPhoneNumber").value, 10);
  
  let researcherModel = {
    id: id,
    name: name,
    lastName: lastName,
    title: title,
    researcherRoleId: researcherRole,
    email: email,
    phoneNumber: phoneNumber,
  };

  if (id != null && id > 0) {
    fetch(researchersroute + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(researcherModel)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update researcher');
      }
      return response.json();
    })
    .then(data => {
      ShowResearchersPage();
    })
    .catch(error => {
      console.error(error);
    });
  } else {
    fetch(researchersroute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(researcherModel)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create researcher');
      }
      return response.json();
    })
    .then(data => {
      ShowResearchersPage();
    })
    .catch(error => {
      console.error(error);
    });
  }
}
function DeleteResearcher() {
  let researcherid = this.id;
  fetch(researchersroute + `/${researcherid}`, {
    method: "DELETE",
    headers: { Authorization: Auth() },
  })
    .then((res) => {
      if (res.ok) {
        GetResearchers(new Object());
      } else {
        alert("Error during delete attempt!");
      }
    })
    .catch((errors) => console.log(errors));
 }
 function EditResearcher(){
  GetResearcherRoles('researcherRoleEdit');
  let researcherid = this.id;
  fetch(researchersroute + `/${researcherid}`, {
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
    console.log("Fetched researchers: ", data); 
    MapToResearcher(data);
  })
    .catch((errors) => console.log(errors));
  ShowResearcherDetailPage();
  hideResearcherRefreshButton();
 }
 function SearchResearcher() {
  
  let searchFieldInput = document.getElementById("researcherSearchFieldInput");
  let researcherRoleId = document.getElementById("researcherRoleId");   
    let body = {
      researcherRoleId: researcherRoleId.value,
      searchTerm: searchFieldInput.value
    };

    let filteredResearchers = GetResearchers(body);
    displayResearchers(filteredResearchers);
 }
 function AddResearcher() {
  GetResearcherRoles('researcherRoleEdit');
  Refresh();
  ShowResearcherDetailPage();
  showResearcherRefreshButton();
 }
 function MapToResearcher(data){
  document.getElementById("researcherId").value = data.id;
  document.getElementById("researcherName").value = data.name;
  document.getElementById("researcherLastName").value = data.lastName;
  document.getElementById("researcherTitle").value = data.title;
  document.getElementById("researcherRoleEdit").value = data.researcherRoleId;
  document.getElementById("researcherEmail").value = data.email;
  document.getElementById("researcherPhoneNumber").value = data.phoneNumber;
 }
