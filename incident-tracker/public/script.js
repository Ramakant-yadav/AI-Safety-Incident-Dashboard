const incidentList = document.getElementById("incident-list");
const form = document.getElementById("incident-form");
const severityFilter = document.getElementById("severity-filter");
const sortSelect = document.getElementById("sort-date");

let incidents = JSON.parse(localStorage.getItem('incidents')) || [];

function createIncidentCard(incident) {
  const card = document.createElement("div");
  card.classList.add("incident-card", "bg-white", "p-5", "rounded-xl", "shadow-lg", "border-l-4");

  if (incident.severity === "High") {
    card.classList.add("border-red-500");
  } else if (incident.severity === "Medium") {
    card.classList.add("border-yellow-400");
  } else {
    card.classList.add("border-green-400");
  }

  card.innerHTML = `
    <h3 class="text-xl font-bold text-gray-800">${incident.title}</h3>
    <p class="text-gray-700 mt-2">${incident.description}</p>
    <span class="inline-block mt-3 text-sm px-3 py-1 rounded-full font-semibold ${
      incident.severity === "High" ? "severity-high" :
      incident.severity === "Medium" ? "severity-medium" : "severity-low"
    }">${incident.severity} Severity</span>
  <div class="mt-2 text-sm text-gray-500">${new Date(incident.date).toLocaleDateString()}</div>
  `;

  return card;
}

function updateStats() {
  const total = incidents.length;
  const high = incidents.filter(i => i.severity === 'High').length;
  const medium = incidents.filter(i => i.severity === 'Medium').length;
  const low = incidents.filter(i => i.severity === 'Low').length;

  document.getElementById("total-count").textContent = total;
  document.getElementById("high-count").textContent = high;
  document.getElementById("medium-count").textContent = medium;
  document.getElementById("low-count").textContent = low;
}

function renderIncidents() {
  incidentList.innerHTML = "";
  let filtered = [...incidents];

  const filterValue = severityFilter.value;
  if (filterValue !== "All") {
    filtered = filtered.filter(i => i.severity === filterValue);
  }

  const sorted = filtered.sort((a, b) => {
    return sortSelect.value === "Newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  sorted.forEach(incident => {
    const card = createIncidentCard(incident);
    incidentList.appendChild(card);
  });

  updateStats(); // 👈 Make stats dynamic
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const severity = document.getElementById("severity").value;

  if (title && description) {
    const newIncident = {
      title,
      description,
      severity,
      date: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIncident)
      });

      if (!response.ok) throw new Error('Failed to save incident to server.');
    } catch (error) {
      console.error('Error saving incident:', error);
      alert('Failed to save incident to server. Saved locally.');
    }

    incidents.push(newIncident);
    localStorage.setItem('incidents', JSON.stringify(incidents));
    renderIncidents();
    form.reset();
  }
});

severityFilter.addEventListener("change", renderIncidents);
sortSelect.addEventListener("change", renderIncidents);

function initializeIncidents() {
  if (incidents.length === 0) {
    fetch('./incidents.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load incidents.json');
        return response.json();
      })
      .then(data => {
        incidents = data.map(incident => ({
          ...incident,
          date: new Date(incident.date).toISOString()
        }));
        localStorage.setItem('incidents', JSON.stringify(incidents));
        renderIncidents();
      })
      .catch(error => {
        console.error("Error loading initial incidents:", error);
      });
  } else {
    renderIncidents();
  }
}

initializeIncidents();
