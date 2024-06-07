let baseRoute = "https://localhost:7123/api/";
let loginroute = baseRoute + "authentication/login";
let registerroute = baseRoute + "authentication/register";
let projectsroute = baseRoute + "projects";
let researchersroute = baseRoute + "researchers";
let clientsroute = baseRoute + "clients";


let jwt = undefined;

function Auth() {
  return `Bearer ${jwt}`;
}
document.addEventListener('DOMContentLoaded', (event) => {
  // Check for existing JWT token in local storage
  jwt = localStorage.getItem('jwt');

  if (jwt) {
    // Verify the token if needed and show the main page
    ShowMainPage();
  } else {
    // Show the login form if no token is found
    //  showMainPage(); 
    ShowLogInPage();
  }
});

function OnBodyLoad() {
  GetProjects(new Object());
  document.getElementById('username').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        Login();
    }
});
  document.getElementById('password').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      Login();
  }
});
}
function Logout() {
  jwt = undefined;
  ShowLogInPage();
}
function Login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let loginModel = {
    username: username,
    password: password,
  };
  let options = {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify(loginModel),
  };
  fetch(loginroute, options)
    .then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          jwt = res.token;
          localStorage.setItem("jwt", res.token);
          /*document.getElementById("side-menu").style.display = "block";
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          document.getElementById("loginform").style.display = "none";
          document.getElementById("postform").style.display = "block";
          document.getElementById("searchform").style.display = "block";
          document.getElementById("loginfo").style.display = "";*/
          
          document.getElementById("userinfo").innerHTML = `Username: <b>${res.username}</b>`;
          ShowMainPage();
          
        });
      } else {
        alert("Login failed. Wrong username or password!");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
      }
    })
    .catch((err) => console.log(err));
}

function Register() {
  let username = document.getElementById("newusername").value;
  let password = document.getElementById("newpassword").value;
  let email = document.getElementById("newemail").value;
  let registermodel = {
    username: username,
    email: email,
    password: password,
  };
  let options = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(registermodel),
  };
  fetch(registerroute, options)
    .then((res) => {
      if (res.ok) {
        alert("Uspesna registracija!");
        document.getElementById("newusername").value = "";
        document.getElementById("newpassword").value = "";
        document.getElementById("newemail").value = "";
        ShowLoginForm();
      } else {
        res.json().then((err) => {
          alert(`Greska prilikom registracije! 
          
          `);
        });
      }
    })
    .catch((err) => console.log(err));
}
function ShowLogInPage() {
  document.getElementById("registerform").style.display = "none";
  document.getElementById("loginform").style.display = "none";
  document.getElementById("loginRegisterButtons").style.display = "block";
  document.getElementById("side-menu").style.display = "none";
  document.getElementById("loginfo").style.display = "none";
  document.getElementById("userinfo").style.display = "none";
  document.getElementById("app").style.display = "none";
}
function ShowMainPage() {
  document.getElementById("loginform").style.display = "none";
  document.getElementById("loginRegisterButtons").style.display = "none";
  document.getElementById("side-menu").style.display = "block";
  document.getElementById("loginfo").style.display = "block";
  document.getElementById("app").style.display = "block";
  GetProjects(new Object());
  //document.getElementById("userinfo").innerHTML = `Username: <b>${res.username}</b>`;
}

function ShowLoginForm() {
  document.getElementById("registerform").style.display = "none";
  document.getElementById("loginform").style.display = "block";
  document.getElementById("loginRegisterButtons").style.display = "none";
}
function ShowRegisterForm() {
  document.getElementById("registerform").style.display = "block";
  document.getElementById("loginform").style.display = "none";
  document.getElementById("loginRegisterButtons").style.display="none";
}
/*function ResetForm() {
  document.getElementById("najmanje").value = "";
  document.getElementById("najvise").value = "";
  document.getElementById("model").value = "";
  document.getElementById("operatingSystem").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
  document.getElementById("manufacturerid").value = 1;
}*/

function ShowResearchersPage(){
  document.getElementById("side-menu").style.display = "block";
  document.getElementById("registerform").style.display = "none";
  document.getElementById("loginform").style.display = "none";
  document.getElementById("loginRegisterButtons").style.display="none";
  document.getElementById("registerform").style.display = "none";
  document.getElementById("app").style.display = "none";
}
function ShowClientsPage(){
  document.getElementById("side-menu").style.display = "block";
  document.getElementById("registerform").style.display = "none";
  document.getElementById("loginform").style.display = "none";
  document.getElementById("loginRegisterButtons").style.display="none";
  document.getElementById("registerform").style.display = "none";
  document.getElementById("app").style.display = "none";
}
function ShowProjectDetailPage(){
  document.getElementById("side-menu").style.display = "block";
  document.getElementById("registerform").style.display = "none";
  document.getElementById("loginform").style.display = "none";
  document.getElementById("loginRegisterButtons").style.display="none";
  document.getElementById("registerform").style.display = "none";
  document.getElementById("loginform").style.display = "none";
  document.getElementById("app").style.display="none";
  document.getElementById("Projectpostform").style.display="block";
}

// MAIN PROJECT TABLE SHOW // 

function GetProjects(request) {
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: Auth(),
    },
    method: "POST",
    body: JSON.stringify(request),
  };
  let route = projectsroute + "/getall"
  fetch(route, options)
    .then((res) => {
      if (res.ok) {
        res.json().then(ShowProjects);
      } else {
        alert(`Error during fetching data ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
}

function AddProject() {
  ShowProjectDetailPage();
  
  }
  /*let name = document.getElementById("name").value;
  let ticketPrice = document.getElementById("ticketPrice").value;
  let firstFestivalDate = document.getElementById("firstFestivalDate").value;
  let placeid = document.getElementById("placeid").value;
  let festival = {
    name: name,
    ticketPrice: ticketPrice,
    firstFestivalDate: firstFestivalDate,
    placeId: placeid,
  };
  let options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: Auth(),
    },
    method: "POST",
    body: JSON.stringify(festival),
  };
  fetch(appartmentsroute, options)
    .then((res) => {
      if (res.ok) {
        GetFestivals();
        ResetForm();
      } else {
        alert("Desila se greska prilikom dodavanja festivala!");
      }
    })
    .catch((errors) => console.log(errors));
}*/
function SaveProject(){
  // uzmes let id  = getElementById ("projectId").value
  // provera, da li ID != null || ID > 0
  // i za POST i za PUT napraviti novi objekat i namapirati sa html - input fields   let name = document.getElementById("name").value;
  // if Id == null Call POST (BE CreateProject)
  // else Id != null Call PUT (BE UpdateProject)
  // back to projects screen (GetProjects(new Object()))
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
  let projectid = this.id;
  // call GetById API
  // map all data to inputs 
  //  document.getElementById("projectName").value = responseApi.Name
  //  document.getElementById("projectId").value = responseApi.Id
  // document.getElementById("projectDetailsProjectStatusId").value = response.projectStatusId
  ShowProjectDetailPage();
 }
 function SearchProject() {
  
  let searchFieldInput = document.getElementById("searchFieldInput");
  let projectStatusId = document.getElementById("projectStatusId");   
    let body = {
      projectStatusId: projectStatusId.value,// levo : atribut na backendu desno atribut na frontu//
      searchTerm: searchFieldInput.value
    };

    let filteredProjects = GetProjects(body);
    displayProjects(filteredProjects);
 }
  function ShowProjects(projects) {
  
  let data = document.getElementById("data");
    data.innerHTML = "";
    // Display projects initially
    displayProjects(projects);
    
}
function GetProjectStatuses() {
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
}
    

function displayProjects(projects) {
  
  let data = document.getElementById("data");
  
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
  let thStatus = document.createElement("th");
  thStatus.innerText = "Status";
  let thStartDate = document.createElement("th");
  thStartDate.innerText = "StartDate";
  let thEndDate = document.createElement("th");
  thEndDate.innerText = "EndDate";

  tr.appendChild(thName);
  tr.appendChild(thStatus);
  tr.appendChild(thStartDate);
  tr.appendChild(thEndDate);

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

    tr.appendChild(tdName);
    tr.appendChild(tdStatus);
    tr.appendChild(tdStartDate);
    tr.appendChild(tdEndDate);

    if (jwt) {
      let tdAction = document.createElement("td");
      tdAction.classList.add("text-center");
      tdAction.style.border = "2px solid black";
      
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.type = "button";
      deleteButton.id = x.id;
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.addEventListener("click", DeleteProject);

      let editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.type = "button";
      editButton.id = x.id;
      editButton.classList.add("btn", "btn-warning");
      editButton.style.width = "70px"; 
      editButton.addEventListener("click", EditProject);
      
      tdAction.appendChild(editButton);
      tdAction.appendChild(deleteButton);
      tr.appendChild(tdAction);
  }
  tbody.appendChild(tr);
}
table.appendChild(tbody);
tableContainer.appendChild(table);
data.appendChild(tableContainer);
GetProjectStatuses(); 
}
