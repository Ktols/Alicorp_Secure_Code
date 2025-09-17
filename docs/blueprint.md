# **App Name**: VulnCheck.js

## Core Features:

- Package File Upload: Allow users to upload `package.json` and/or `package-lock.json` files from their local machine.
- Dependency Analysis: Parse and extract dependencies and their versions from the uploaded package files using JavaScript.
- Vulnerability Scan: Compare the extracted dependencies and versions against an embedded database of known vulnerabilities.
- Vulnerability Table: Display the analysis results in an HTML table, highlighting vulnerable packages and their installed versions, and suggest remediation or transitions. If the database of vulnerable packages lacks sufficient information to accurately guide security analysis, the LLM tool is leveraged to find accurate information for its suggestion.
- Vulnerable Package List: Visually display the complete list of known vulnerable packages in a separate HTML table for reference.
- CSV Export: Enable users to export the vulnerability analysis results as a CSV file for further analysis or reporting.
- Security Recommendations (AI): Integrate a simulation of Gemini AI to provide security recommendations based on the vulnerability analysis results.

## Style Guidelines:

- Primary color: White (#FFFFFF) for background and base text.
- Accent color: Red (#FF3233) to highlight alerts and vulnerable packages.
- Secondary accent color: Green (#78B928) to indicate safe dependencies and non-vulnerable status.
- Body and headline font: 'Inter', a grotesque-style sans-serif, is used to provide a modern and objective look.
- Employ a responsive layout using CSS Grid or a lightweight CSS framework like Bootstrap to ensure compatibility across devices.
- Use clear and simple icons to represent the status of dependencies (e.g., a checkmark for safe, an exclamation point for vulnerable).
- Use subtle animations to show status updates and loading indications.