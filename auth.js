let baseRoute = "https://localhost:7123/api/";
let loginroute = baseRoute + "authentication/login";
let registerroute = baseRoute + "authentication/register";

let jwt = undefined;

function Auth() {
  
  return `Bearer ${jwt}`;
}

  function Login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let loginModel = { username, password };
  
  fetch(loginroute, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(loginModel),
  })
  .then((res) => res.ok ? res.json() : Promise.reject(res))
  .then((res) => {
    jwt = res.token;
    localStorage.setItem("jwt", res.token);
    document.getElementById("userinfo").innerHTML = `Username: <b>${res.username}</b>`;
    ShowProjectsPage();
  })
  .catch(() => {
    alert("Login failed. Wrong username or password!");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  });
}

function Logout() {
  jwt = undefined;
  localStorage.removeItem("jwt");
  ShowLogInPage();
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


