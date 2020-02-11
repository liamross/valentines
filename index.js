import CryptoJS from "crypto-js";
import cypher from "./cypher";

const storage = "password";
const delimiter = "|||";

const meet = document.getElementById("meet");
const lung = document.getElementById("lung");
const date = document.getElementById("date");

const text = document.getElementById("text");

function storePassword(password) {
  setTimeout(() => {
    localStorage.setItem(storage, password);
  });
}

function setValuesFromStoredPassword() {
  const stored = localStorage.getItem(storage);
  if (!stored) return;

  const values = stored.split(delimiter);
  meet.value = values[0] || "";
  lung.value = values[1] || "";
  date.value = values[2] || "";
}

function decrypt(...passwordParts) {
  const password = passwordParts.join(" ");
  if (!password.trim()) return (text.innerHTML = "");

  const bytes = CryptoJS.AES.decrypt(cypher, password);
  let plaintext;
  try {
    plaintext = bytes.toString(CryptoJS.enc.Utf8);
    text.classList.add("valid");
    storePassword(passwordParts.join(delimiter));
  } catch {
    text.classList.remove("valid");
    plaintext = bytes.toString();
  }
  text.innerText = plaintext;
}

function onChange() {
  const meetValue = meet.value || "";
  const lungValue = lung.value || "";
  const dateValue = date.value || "";

  decrypt(meetValue, lungValue, dateValue);
}

meet.addEventListener("input", onChange);
lung.addEventListener("input", onChange);
date.addEventListener("input", onChange);

setValuesFromStoredPassword();

onChange();
