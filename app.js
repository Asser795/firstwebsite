let account = null;

const routes = {
  "/login": { templateId: "login" },
  "/dashboard": { templateId: "dashboard" },
};

function updateRoute(templateId) {
  const template = document.getElementById(templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(view);
}

updateRoute("login");

function updateRoute() {
  const path = window.location.pathname;
  const route = routes[path];

  const template = document.getElementById(route.templateId);
  const view = template.content.cloneNode(true);
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(view);
}

function navigate(path) {
  window.history.pushState({}, path, window.location.origin + path);
  updateRoute();
}

function updateRoute() {
  const path = window.location.pathname;
  const route = routes[path];

  if (!route) {
    return navigate("/login");
  }
}
function onLinkClick(event) {
  event.preventDefault();
  navigate(event.target.href);
}

window.onpopstate = () => updateRoute();
updateRoute();

function register() {
  const registerForm = document.getElementById("registerForm");
  const formData = new FormData(registerForm);
  const data = Object.fromEntries(formData);
  const jsonData = JSON.stringify(data);
}

async function createAccount(account) {
  try {
    const response = await fetch("//localhost:5000/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: account,
    });
    return await response.json();
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}
async function register() {
  const registerForm = document.getElementById("registerForm");
  const formData = new FormData(registerForm);
  const jsonData = JSON.stringify(Object.fromEntries(formData));
  const result = await createAccount(jsonData);

  if (result.error) {
    return console.log("An error occured:", result.error);
  }

  console.log("Account created!", result);
}

async function login() {
  const loginForm = document.getElementById("loginForm");
  const user = loginForm.user.value;
}

async function getAccount(user) {
  try {
    const response = await fetch(
      "//localhost:5000/api/accounts/" + encodeURIComponent(user)
    );
    return await response.json();
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}

async function login() {
  const loginForm = document.getElementById("loginForm");
  const user = loginForm.user.value;
  const data = await getAccount(user);

  if (data.error) {
    return console.log("loginError", data.error);
  }

  account = data;
  navigate("/dashboard");
}

<form id="loginForm" action="javascript:login()">
  {" "}
</form>;

account = result;
navigate("/dashboard");

function updateElement(id, text) {
  const element = document.getElementById(id);
  element.textContent = text;
}

if (data.error) {
  return updateElement("loginError", data.error);
}

<div id="loginError" role="alert"></div>;

function updateDashboard() {
  if (!account) {
    return navigate("/login");
  }

  updateElement("description", account.description);
  updateElement("balance", account.balance.toFixed(2));
  updateElement("currency", account.currency);
}

if (typeof route.init === "function") {
  route.init();
}

const routes = {
  "/login": { templateId: "login" },
  "/dashboard": { templateId: "dashboard", init: updateDashboard },
};

function createTransactionRow(transaction) {
  const template = document.getElementById("transaction");
  const transactionRow = template.content.cloneNode(true);
  const tr = transactionRow.querySelector("tr");
  tr.children[0].textContent = transaction.date;
  tr.children[1].textContent = transaction.object;
  tr.children[2].textContent = transaction.amount.toFixed(2);
  return transactionRow;
}

const transactionsRows = document.createDocumentFragment();
for (const transaction of account.transactions) {
  const transactionRow = createTransactionRow(transaction);
  transactionsRows.appendChild(transactionRow);
}
updateElement("transactions", transactionsRows);

function updateElement(id, textOrNode) {
  const element = document.getElementById(id);
  element.textContent = ""; // Removes all children
  element.append(textOrNode);
}

function updateState(property, newData) {
  state = Object.freeze({
    ...state,
    [property]: newData,
  });
}

let state = Object.freeze({
  account: null,
});

updateState("account", result);

updateState("account", data);

function logout() {
  updateState("account", null);
  navigate("/login");
  localStorage.setItem(storageKey, JSON.stringify(state.account));
}

const storageKey = "savedAccount";

function init() {
  const savedAccount = localStorage.getItem(storageKey);
  if (savedAccount) {
    updateState('account', JSON.parse(savedAccount));
  }

  // Our previous initialization code
  window.onpopstate = () => updateRoute();
  updateRoute();
}

init();

async function updateAccountData() {
  const account = state.account;
  if (!account) {
    return logout();
  }

  const data = await getAccount(account.user);
  if (data.error) {
    return logout();
  }

  updateState('account', data);
}

async function refresh() {
  await updateAccountData();
  updateDashboard();
}

const routes = {
  '/login': { templateId: 'login' },
  '/dashboard': { templateId: 'dashboard', init: refresh }
};