function OnBodyLoad() {
  jwt = localStorage.getItem("jwt");
  if (jwt) {
    ShowProjectsPage();
  } else {
    ShowLogInPage();
  }
}



function ShowProjectsPage() {
  document.getElementById('loginfo').style.display = 'block';
  document.getElementById("side-menu").style.display = "block";
  document.getElementById('projectApp').style.display = 'block';
  document.getElementById('clientApp').style.display = 'none';
  document.getElementById('phaseApp').style.display = 'none';
  document.getElementById("researcherToProjectApp").style.display="none";
  document.getElementById("clientToProjectApp").style.display="none";
  document.getElementById('researcherApp').style.display = 'none';
  HideLoginAndRegisterForms();
  HidePostForms();
  GetProjects(new Object());
}
function ShowProjectDetailPage(){
  document.getElementById("side-menu").style.display = "block";
  document.getElementById("Projectpostform").style.display="block";
  document.getElementById("phaseApp").style.display="block";
  document.getElementById("researcherToProjectApp").style.display="block";
  document.getElementById("clientToProjectApp").style.display="block";
  HideLoginAndRegisterForms();
  HideAppForms();
}
function HideLoginAndRegisterForms(){
  document.getElementById('loginform').style.display = 'none';
  document.getElementById('registerform').style.display = 'none';
  document.getElementById('loginRegisterButtons').style.display = 'none';
}
function HideAppForms(){
  document.getElementById('projectApp').style.display='none';
  document.getElementById('clientApp').style.display = 'none';
  document.getElementById('researcherApp').style.display = 'none';
}
function HidePostForms(){
  document.getElementById('Projectpostform').style.display = 'none';
  document.getElementById('Researcherpostform').style.display = 'none';
  document.getElementById('Clientpostform').style.display = 'none'; 
}
function ShowResearchersPage() {
  HidePostForms();
  HideLoginAndRegisterForms();
  document.getElementById("side-menu").style.display = "block";
  document.getElementById('clientApp').style.display = 'none';
  document.getElementById('projectApp').style.display = 'none';
  document.getElementById('researcherApp').style.display = 'block';
  document.getElementById('phaseApp').style.display = 'none';
  document.getElementById("researcherToProjectApp").style.display="none";
  document.getElementById("clientToProjectApp").style.display="none";
  GetResearchers(new Object());
}
function ShowResearcherDetailPage(){
  document.getElementById("side-menu").style.display = "block";
  document.getElementById("Researcherpostform").style.display="block";
  HideLoginAndRegisterForms();
  HideAppForms();
}

function ShowClientsPage() {
  HidePostForms();
  HideLoginAndRegisterForms();
  document.getElementById("side-menu").style.display = "block";
  document.getElementById('projectApp').style.display = 'none';
  document.getElementById('clientApp').style.display = 'block';
  document.getElementById('researcherApp').style.display = 'none';
  document.getElementById('phaseApp').style.display = 'none';
  GetClients(new Object());
}
function ShowClientDetailPage(){
  document.getElementById("side-menu").style.display = "block";
  document.getElementById("Clientpostform").style.display="block";
  HideLoginAndRegisterForms();
  HideAppForms();
}

function ShowLoginForm() {
  document.getElementById('loginform').style.display = 'block';
  document.getElementById('registerform').style.display = 'none';
  document.getElementById('projectApp').style.display = 'none';
  document.getElementById('Projectpostform').style.display = 'none';
  document.getElementById('loginRegisterButtons').style.display = 'none';
  document.getElementById('phaseApp').style.display = 'none';
}

function ShowRegisterForm() {
  document.getElementById('registerform').style.display = 'block';
  document.getElementById('loginform').style.display = 'none';
  document.getElementById('projectApp').style.display = 'none';
  document.getElementById('Projectpostform').style.display = 'none';
  document.getElementById('loginRegisterButtons').style.display = 'none';
}

function ShowLogInPage() {
  document.getElementById('password').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        Login();
    }
  });
  document.getElementById('loginfo').style.display = 'none';
  document.getElementById("side-menu").style.display = "none";
  document.getElementById('loginRegisterButtons').style.display = 'block';
  document.getElementById('loginform').style.display = 'none';
  document.getElementById('registerform').style.display = 'none';
  HidePostForms();
  HideAppForms();
}
function Refresh() {
  document.getElementById("projectId").value = "";
  document.getElementById("researcherId").value = "";
  document.getElementById("clientId").value = "";
  document.getElementById("projectName").value = "";
  document.getElementById("projectDescription").value = "";
  document.getElementById("projectStatus").value = 0;
  document.getElementById("projectStartDate").value = new Date().toISOString().slice(0, 16);
  document.getElementById("projectEndDate").value = new Date().toISOString().slice(0, 16);
  document.getElementById("projectDateOfCreation").value = new Date().toISOString().slice(0, 16);
  document.getElementById("projectPlannedStartDate").value = new Date().toISOString().slice(0, 16);
  document.getElementById("projectPlannedEndDate").value = new Date().toISOString().slice(0, 16);
  document.getElementById("researcherName").value = "";
  document.getElementById("researcherLastName").value = "";
  document.getElementById("researcherTitle").value = "";
  document.getElementById("researcherRoleEdit").value = 0;
  document.getElementById("researcherEmail").value = "";
  document.getElementById("researcherPhoneNumber").value = "";
  document.getElementById("clientName").value = "";
  document.getElementById("clientPlace").value = "";
  document.getElementById("clientEmail").value = "";
  document.getElementById("clientPhoneNumber").value = "";
}
function showProjectRefreshButton() {
  document.getElementById('projectRefreshButton').style.display = 'inline-block';
}
function hideProjectRefreshButton() {
  document.getElementById('projectRefreshButton').style.display = 'none';
}
function showResearcherRefreshButton() {
  document.getElementById('researcherRefreshButton').style.display = 'inline-block';
}
function hideResearcherRefreshButton() {
  document.getElementById('researcherRefreshButton').style.display = 'none';
}
function showClientRefreshButton() {
  document.getElementById('clientRefreshButton').style.display = 'inline-block';
}
function hideClientRefreshButton() {
  document.getElementById('clientRefreshButton').style.display = 'none';
}
window.onload = function() {
  CKEDITOR.replace('projectDescription');
};
var modal = document.getElementById("phaseModal");

function DisplayModal() {
  var modal = document.getElementById("phaseModal"); 
  modal.style.display = "block";
}
function CloseModal() {
  var modal = document.getElementById("phaseModal"); 
  modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function DisplayResearcherModal() {
  var modal = document.getElementById("researcherToProjectModal"); 
  modal.style.display = "block";
  GetResearchersSelect(new Object(), "researcherSelect"); 
}
function CloseResearcherModal() {
  var modal = document.getElementById("researcherToProjectModal"); 
  modal.style.display = "none";
}

function DisplayClientModal() {
  var modal = document.getElementById("clientToProjectModal"); 
  modal.style.display = "block";
  GetClientsSelect(new Object(), "clientSelect"); 
}
function CloseClientModal() {
  var modal = document.getElementById("clientToProjectModal"); 
  modal.style.display = "none";
}
