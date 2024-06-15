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
    console.log("Fetched Projects: ", data); 
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
  let phases = getPhasesFromLocalStorage();
  let researchers = getResearchersToProjectFromLocalStorage();
  
  let projectModel = {
    id: id,
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    dateOfCreation: dateOfCreation,
    plannedStartDate: plannedStartDate,
    plannedEndDate: plannedEndDate,
    projectStatusId: projectStatus,
    phases : phases,
    projectResearchers : researchers
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
    localStorage.setItem('projectPhases', JSON.stringify(data.phases));
    ShowPhases(data.phases);
  })
    .catch((errors) => console.log(errors));
  ShowProjectDetailPage();
  hideProjectRefreshButton();
  document.getElementById('projectPostformTextName').textContent = "Edit project";
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
  document.getElementById('projectPostformTextName').textContent = 'Add Project';
  let data = document.getElementById("phaseData");
  data.innerHTML = "";
  ShowPhases(data);
  let dataResearcher = document.getElementById("researcherToProjectData");
  dataResearcher.innerHTML = "";
  //ShowResearchersToProject(dataResearcher);
  let dataClient = document.getElementById("clientToProjectData");
  dataClient.innerHTML = "";
  //ShowClientsToProject(dataClient);
  localStorage.removeItem('projectPhases');
  localStorage.removeItem('researchersToProject');
 }
 function formatDateTimeStringWithMoment(dateTimeString) {
  const date = moment(dateTimeString);
  return date.format('YYYY-MM-DDTHH:mm');
}
 function MapToProject(data){
  document.getElementById("projectId").value = data.id;
  document.getElementById("projectName").value = data.name;
  document.getElementById("projectDescription").value = data.description;
  document.getElementById("projectStatus").value = data.projectStatusId;
  document.getElementById("projectStartDate").value = formatDateTimeStringWithMoment(data.startDate);
  document.getElementById("projectEndDate").value = formatDateTimeStringWithMoment(data.endDate);
  document.getElementById("projectDateOfCreation").value = formatDateTimeStringWithMoment(data.dateOfCreation);
  document.getElementById("projectPlannedStartDate").value = formatDateTimeStringWithMoment(data.plannedStartDate);
  document.getElementById("projectPlannedEndDate").value = formatDateTimeStringWithMoment(data.plannedEndDate);
 }
 
 
 function AddPhase(){
  document.getElementById("phaseId").value = 0;
  document.getElementById("phaseName").value = "";
  document.getElementById("phaseDescription").value = "";
  DisplayModal();
 }
 function ShowPhases(phases) {
  let data = document.getElementById("phaseData");
  data.innerHTML = "";
  displayPhases(phases);
}

function displayPhases(phases) {
  jwt = localStorage.getItem("jwt");
  let data = document.getElementById("phaseData");
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
  let thDescription = document.createElement("th");
  thDescription.innerText = "Description";
  thDescription.style.border = "2px solid black";
  
  tr.append(thName, thDescription);

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

  if (Array.isArray(phases)) {
  for (let x of phases) {
    let tr = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.innerText = x.name;
    tdName.style.border = "2px solid black";

    let tdDescription = document.createElement("td");
    tdDescription.innerText = x.description;
    tdDescription.style.border = "2px solid black";

    tr.append(tdName, tdDescription);

    if (jwt) {
      let tdAction = document.createElement("td");
      tdAction.classList.add("text-center");
      tdAction.style.border = "2px solid black";
      
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.type = "button";
      deleteButton.id = x.id;
      deleteButton.classList.add("btn", "btn-outline-danger");
      deleteButton.addEventListener("click", DeletePhase);

      let editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.type = "button";
      editButton.id = x.id;
      editButton.classList.add("btn", "btn-outline-info");
      editButton.style.width = "70px"; 
      editButton.addEventListener("click", EditPhase);
      
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
function getPhasesFromLocalStorage() {
  const phases = localStorage.getItem('projectPhases');
  console.log("Retrieved phases from local storage:", phases);
  return phases ? JSON.parse(phases) : [];
}
function savePhasesToLocalStorage(phases) {
  localStorage.setItem('projectPhases', JSON.stringify(phases));
}
function DeletePhase(){
  let phaseId = parseInt(this.id, 10);
  let phases = getPhasesFromLocalStorage();
  phases = phases.filter(phase => phase.id !== phaseId);
  savePhasesToLocalStorage(phases);
  ShowPhases(phases);
}
function getPhaseById(phaseId) {
  const phases = getPhasesFromLocalStorage();
  console.log("Parsed phases:", phases);
  console.log("Looking for phase with ID:", phaseId);
  return phases.find(phase => phase.id === phaseId) || null;
}
function EditPhase() {
  let phaseId = parseInt(this.id, 10);
  document.getElementById("phaseId").value = phaseId;
  console.log("Editing phase with ID:", phaseId);
  let phase = getPhaseById(phaseId);
  if (phase) {
    console.log("Phase found:", phase);
    document.getElementById("phaseName").value = phase.name;
    document.getElementById("phaseDescription").value = phase.description;
  } else {
    console.log("Phase not found");
  }
  DisplayModal();
}
function SavePhase(){
  let phaseId = parseInt(document.getElementById("phaseId").value, 10);
  let phases = getPhasesFromLocalStorage();
  let newPhaseData = {
    id: phaseId,
    name: document.getElementById("phaseName").value,
    description: document.getElementById("phaseDescription").value
  };
  if(phaseId === 0) {
    phases.push(newPhaseData);
  } else{
    phases = phases.map(phase => phase.id === phaseId ? { ...phase, ...newPhaseData } : phase);
  }
  savePhasesToLocalStorage(phases);
  ShowPhases(phases);
  CloseModal();
}
function AddResearcherToProject(){
  document.getElementById("researcherToProjectId").value = 0;
  document.getElementById("researcherSelect").value = 0;
  document.getElementById("researcherToProjectStartDate").value = new Date().toISOString().slice(0, 16);
  document.getElementById("researcherToProjectEndDate").value = new Date().toISOString().slice(0, 16);
  DisplayResearcherModal();
 }
 function GetResearchersSelect(request,elementId){
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
    ShowResearchersSelect(data,elementId);
    
  })
  .catch((err) => {
    console.error("Error fetching researchers:", err);
  });  
}
 function ShowResearchersSelect(researchers, elementId) {
  let select = document.getElementById(elementId);
 
  
if (select.children.length === 0) {  
  let allOption = document.createElement("option");
  allOption.text = "Show All";
  allOption.value = 0;
  select.appendChild(allOption);

  for (const x of researchers) {
    let option = document.createElement("option");
    option.innerText = x.name +" "+ x.lastName;
    option.value = x.id;
    select.appendChild(option);
  }
}
}
function ShowResearchersToProject(researchers){
  let data = document.getElementById("researcherToProjectData");
  data.innerHTML = "";
  displayResearchersToProject(researchers);
}

function displayResearchersToProject(researchers) {
  jwt = localStorage.getItem("jwt");
  let data = document.getElementById("researcherToProjectData");
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
  let thStartDate = document.createElement("th");
  thStartDate.innerText = "Start date";
  thStartDate.style.border = "2px solid black";
  let thEndDate = document.createElement("th");
  thEndDate.innerText = "End date";
  thEndDate.style.border = "2px solid black";
  
  tr.append(thName, thStartDate, thEndDate);

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

  if (Array.isArray(researchers)) {
  for (let x of researchers) {
    let tr = document.createElement("tr");

    let tdName = document.createElement("td");
    tdName.innerText = x.name;
    tdName.style.border = "2px solid black";

    let tdStartDate = document.createElement("td");
    tdStartDate.innerText = x.startDate;
    tdStartDate.style.border = "2px solid black";

    let tdEndDate = document.createElement("td");
    tdEndDate.innerText = x.endDate;
    tdEndDate.style.border = "2px solid black";


    tr.append(tdName, tdStartDate, tdEndDate);

    if (jwt) {
      let tdAction = document.createElement("td");
      tdAction.classList.add("text-center");
      tdAction.style.border = "2px solid black";
      
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.type = "button";
      deleteButton.id = x.researcherId;
      deleteButton.classList.add("btn", "btn-outline-danger");
      deleteButton.addEventListener("click", DeleteResearcherToProject);

      let editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.type = "button";
      editButton.id = x.researcherId;
      editButton.classList.add("btn", "btn-outline-info");
      editButton.style.width = "70px"; 
      editButton.addEventListener("click", EditResearcherToProject);
      
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
function getResearchersToProjectFromLocalStorage(){
  const researchersToProject = localStorage.getItem('researchersToProject');
  console.log("Retrieved Researchers from local storage:", researchersToProject);
  return researchersToProject ? JSON.parse(researchersToProject) : [];
}
function saveResearchersToProjectLocalStorage(researchersToProject){
  localStorage.setItem('researchersToProject', JSON.stringify(researchersToProject));
}
function SaveResearcherToProject(){
  let researcherToProjectId = parseInt(document.getElementById("researcherToProjectId").value, 10);
  let researcherSelect = document.getElementById("researcherSelect"); // Correctly reference the dropdown element
  let researcherId = parseInt(document.getElementById("researcherSelect").value, 10);
  // let researcherRoleId = parseInt(document.getElementById("researcherRoleSelect").value, 10);
  let selectedOption = null;
  let researcherName = null;
  for (let i = 0; i < researcherSelect.options.length; i++) {
    if (parseInt(researcherSelect.options[i].value, 10) === researcherId) {
      selectedOption = researcherSelect.options[i];
      break;
    }
  }
  if(selectedOption){
    researcherName = selectedOption.textContent;
  }
  let researchersToProject = getResearchersToProjectFromLocalStorage();
  let newResearcherToProjectData = {
    projectId: researcherToProjectId,
    name: researcherName,
    researcherId: parseInt(researcherId, 10) ,
    startDate: document.getElementById("researcherToProjectStartDate").value,
    endDate: document.getElementById("researcherToProjectEndDate").value,
    // researcherRoleId : researcherRoleId
  };
  if(researcherToProjectId === 0) {
    researchersToProject.push(newResearcherToProjectData);
  } else{
    researchersToProject = researchersToProject.map(researchersToProject => researchersToProject.researcherId === researcherToProjectId ? { ...researchersToProject, ...newResearcherToProjectData } : researchersToProject);
  }
  saveResearchersToProjectLocalStorage(researchersToProject);
  ShowResearchersToProject(researchersToProject);
  CloseResearcherModal();
}
function DeleteResearcherToProject(){
  let researcherToProjectId = parseInt(this.id, 10);
  let researchers = getResearchersToProjectFromLocalStorage();
  researchers = researchers.filter(researchers => researchers.researcherId !== researcherToProjectId);
  saveResearchersToProjectLocalStorage(researchers);
  ShowResearchersToProject(researchers);
}
function getResearcherToProjectById(researcherToProjectId) {
  const researcherToProject = getResearchersToProjectFromLocalStorage();
  console.log("Parsed researchers:", researcherToProject);
  console.log("Looking for researcher with ID:", researcherToProjectId);
  return researcherToProject.find(researcherToProject => researcherToProject.researcherId === researcherToProjectId) || null;
}
function EditResearcherToProject(){
  let researcherToProjectId = parseInt(this.id, 10);
  document.getElementById("researcherToProjectId").value = researcherToProjectId;
  console.log("Editing phase with ID:", researcherToProjectId);
  let researcherToProject = getResearcherToProjectById(researcherToProjectId);
  if (researcherToProject) {
    console.log("Researcher found:", researcherToProject);
    document.getElementById("researcherSelect").value = researcherToProject.researcherId;
    document.getElementById("researcherToProjectStartDate").value = researcherToProject.startDate;
    document.getElementById("researcherToProjectEndDate").value = researcherToProject.endDate;
  } else {
    console.log("Researcher not found");
  }
  DisplayResearcherModal();
}