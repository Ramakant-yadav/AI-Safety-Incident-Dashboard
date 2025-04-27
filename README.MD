# AI Safety Incident Dashboard

A vanilla JavaScript, HTML, and CSS implementation of an AI Safety Incident Dashboard for HumanChain's frontend intern take-home assignment.

![AI Safety Incident Dashboard Screenshot](https://i.imgur.com/example.png)

## Features

- Display a list of AI safety incidents with Title, Severity, and Reported Date.
- Filter incidents by severity (All, Low, Medium, High).
- Sort incidents by date (Newest First, Oldest First).
- Toggle incident details to view full description.
- Form to report new incidents with input validation.
- Responsive layout using CSS Grid and Flexbox.
- Clean, minimal styling with hover effects.

## Setup Instructions

1. Clone or download the project.
2. Open `index.html` in a web browser (no build step required).
3. Alternatively, serve the files using a local server (e.g., `python -m http.server` or VS Code's Live Server).



## Design Decisions

- Used vanilla JavaScript for state management to keep the project lightweight.
- Implemented a modular `renderIncidents` function to handle filtering, sorting, and rendering.
- Chose CSS Grid for the incident list and Flexbox for controls to ensure responsiveness.
- Added basic input validation to prevent empty submissions.
- Used semantic HTML and ARIA-compatible practices for accessibility.

## Future Improvements

- Add user authentication
- Implement incident categories and tagging
- Create data visualization for incident metrics
- Add editing and deletion functionality
- Implement keyboard navigation for better accessibility
- Add unit and integration tests


## Challenges

- Managing the toggle state for incident descriptions was handled by toggling a CSS class to avoid complex state management.
- Ensuring responsive design across screen sizes required careful use of media queries and flexible layouts.
