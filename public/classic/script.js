const endpoint = "/api/generate";

async function generate() {
  const promptInput = document.getElementById("prompt");
  const preset = document.getElementById("preset").value;
  const language = document.getElementById("language").value;

  let prompt = promptInput.value.trim();
  if (!prompt && preset) prompt = preset;
  if (!prompt) {
    alert("Please enter a prompt or select a preset.");
    return;
  }

  document.getElementById("result").innerText = "Generating...";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, language })
  });

  const data = await response.json();
  document.getElementById("result").innerText = data.result;
  addToHistory(data.result);
}

function regenerate() {
  generate();
}

function copyComment() {
  const result = document.getElementById("result").innerText;
  navigator.clipboard.writeText(result);
  alert("Copied to clipboard!");
}

function addToHistory(text) {
  const ul = document.getElementById("history");
  const li = document.createElement("li");
  li.innerText = text;
  ul.insertBefore(li, ul.firstChild);
}

function updateLanguage() {
  // Optional hook if language affects your backend prompt formatting
}
