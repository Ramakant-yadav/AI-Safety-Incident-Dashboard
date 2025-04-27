fetch("https://incidentdatabase.ai/api/graphql", {
    method: "POST",
    headers: {
      "accept": "*/*",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      operationName: "FindIncidentHistory",
      variables: {
        filter: {
          incident_id: { EQ: 100 }
        }
      },
      query: `
        query FindIncidentHistory($filter: History_incidentFilterType) {
          history_incidents(filter: $filter, sort: {epoch_date_modified: DESC}) {
            title
            description
            date
          }
        }
      `
    })
  })
  .then(response => response.json())
  .then(data => {
    const incidents = data.data.history_incidents.map(incident => ({
      title: incident.title,
      description: incident.description,
      date: incident.date
    }));
  
    // Logging the JSON data
    console.log(JSON.stringify(incidents, null, 2));
  })
  .catch(error => {
    console.error("Error fetching incident data:", error);
  });
  