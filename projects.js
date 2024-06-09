let projectsroute = baseRoute + "projects";

function GetProjects(request) {
  fetch(projectsroute + "/getall", {
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
    console.log("Fetched Projects: ", data); // Log the fetched data
    ShowProjects(data);
  })
  .catch((err) => {
    console.error("Error fetching projects:", err);
  });
}

function ShowProjects(projects) {
  let data = document.getElementById("projectData");
  data.innerHTML = "";
  displayProjects(projects);
}

function displayProjects(projects) {
  jwt = localStorage.getItem("jwt");
  let data = document.getElementById("projectData");
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
  let thStatus = document.createElement("th");
  thStatus.innerText = "Status";
  thStatus.style.border = "2px solid black";
  let thStartDate = document.createElement("th");
  thStartDate.innerText = "Start Date";
  thStartDate.style.border = "2px solid black";
  let thEndDate = document.createElement("th");
  thEndDate.innerText = "End Date";
  thEndDate.style.border = "2px solid black";
  tr.append(thName, thStatus, thStartDate, thEndDate);

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

  if (Array.isArray(projects)) {
  for (let x of projects) {
    let tr = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.innerText = x.name;
    tdName.style.border = "2px solid black";

    let tdStatus = document.createElement("td");
    tdStatus.innerText = x.projectStatusName;
    tdStatus.style.border = "2px solid black";

    let tdStartDate = document.createElement("td");
    tdStartDate.innerText = x.startDate;
    tdStartDate.style.border = "2px solid black";

    let tdEndDate = document.createElement("td");
    tdEndDate.innerText = x.endDate;
    tdEndDate.style.border = "2px solid black";

    tr.append(tdName, tdStatus, tdStartDate, tdEndDate);

    if (jwt) {
      let tdAction = document.createElement("td");
      tdAction.classList.add("text-center");
      tdAction.style.border = "2px solid black";
      
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.type = "button";
      deleteButton.id = x.id;
      deleteButton.classList.add("btn", "btn-outline-danger");
      deleteButton.addEventListener("click", DeleteProject);

      let editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.type = "button";
      editButton.id = x.id;
      editButton.classList.add("btn", "btn-outline-info");
      editButton.style.width = "70px"; 
      editButton.addEventListener("click", EditProject);
      
      tdAction.append(editButton, deleteButton);
      tr.appendChild(tdAction);
    }
    tbody.appendChild(tr);
  }
 }
  table.appendChild(tbody);
  tableContainer.appendChild(table);
  data.appendChild(tableContainer);
  GetProjectStatuses("projectStatusId"); 
}
function GetProjectStatuses(elementId) {
  let projectStatusesroute = projectsroute + "/GetProjectStatuses"
  fetch(projectStatusesroute)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    }) 
    .then((data) => {
      console.log("Fetched clients: ", data); 
      ShowProjectStatuses(data, elementId);
    })
    .catch((err) => console.log(err));
}
function ShowProjectStatuses(projectStatuses, elementId) {
  let select = document.getElementById(elementId);
 
  
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
}
function SaveProject(){
  let id = parseInt(document.getElementById("projectId").value, 10);
  let name = document.getElementById("projectName").value;
  let description = document.getElementById("projectDescription").value;
  let startDate = document.getElementById("projectStartDate").value;
  let endDate = document.getElementById("projectEndDate").value;
  let dateOfCreation = document.getElementById("projectDateOfCreation").value;
  let plannedStartDate = document.getElementById("projectPlannedStartDate").value;
  let plannedEndDate = document.getElementById("projectPlannedEndDate").value;
  let projectStatus = document.getElementById("projectStatus").value;
  
  let projectModel = {
    id: id,
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    dateOfCreation: dateOfCreation,
    plannedStartDate: plannedStartDate,
    plannedEndDate: plannedEndDate,
    projectStatusId: projectStatus
  };

  if (id != null && id > 0) {
    
    fetch(projectsroute + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectModel)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
      return response.json();
    })
    .then(data => {
      ShowProjectsPage();
    })
    .catch(error => {
      console.error(error);
      
    });
  } else {
    
    fetch(projectsroute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectModel)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      return response.json();
    })
    .then(data => {
      ShowProjectsPage();
    })
    .catch(error => {
      console.error(error);
      
    });
  }
  }
function DeleteProject() {
  let projectid = this.id;
  fetch(projectsroute + `/${projectid}`, {
    method: "DELETE",
    headers: { Authorization: Auth() },
  })
    .then((res) => {
      if (res.ok) {
        GetProjects(new Object());
        ResetForm();
      } else {
        alert("Error during delete attempt!");
      }
    })
    .catch((errors) => console.log(errors));
 }
 function EditProject(){
  GetProjectStatuses('projectStatus');
  let projectid = this.id;
  fetch(projectsroute + `/${projectid}`, {
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
    console.log("Fetched projects: ", data); 
    MapToProject(data);
  })
    .catch((errors) => console.log(errors));
  ShowProjectDetailPage();
  hideProjectRefreshButton();
 }
 function SearchProject() {
  
  let searchFieldInput = document.getElementById("projectSearchFieldInput");
  let projectStatusId = document.getElementById("projectStatusId");   
    let body = {
      projectStatusId: projectStatusId.value,
      searchTerm: searchFieldInput.value
    };

    let filteredProjects = GetProjects(body);
    displayProjects(filteredProjects);
 }
 function AddProject() {
  GetProjectStatuses('projectStatus');
  ShowProjectDetailPage();
  showProjectRefreshButton();
  Refresh();
 }
 function MapToProject(data){
  document.getElementById("projectId").value = data.id;
  document.getElementById("projectName").value = data.name;
  document.getElementById("projectDescription").value = data.description;
  document.getElementById("projectStatus").value = data.projectStatusId;
  document.getElementById("projectStartDate").value = data.startDate;
  document.getElementById("projectEndDate").value = data.endDate;
  document.getElementById("projectDateOfCreation").value = data.dateOfCreation;
  document.getElementById("projectPlannedStartDate").value = data.plannedStartDate;
  document.getElementById("projectPlannedEndDate").value = data.plannedEndDate;
 }