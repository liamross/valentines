import CryptoJS from "crypto-js";
import cypher from "./cypher";

const meet = document.getElementById("meet");
const lung = document.getElementById("lung");
const date = document.getElementById("date");

const text = document.getElementById("text");

function decrypt(...passwordParts) {
  const password = passwordParts.join(" ");
  if (!password.trim()) return (text.innerHTML = "");
  const bytes = CryptoJS.AES.decrypt(cypher, password);
  let plaintext;
  try {
    text.classList.add("valid");
    plaintext = bytes.toString(CryptoJS.enc.Utf8);
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

onChange();
