# Condition Builder

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)

---------------------------------------------------------------------

[LIVE DEMO](https://www.google.com/)


This project is called the Condition Builder. This tool allows you to load an array of data and layer in and/or conditions to filter the data. Below are the features and requirements for this project:

### Features:
- [x] User can load an array of data from a provided URL.
- [x] User can build logical conditions using and/or operators.
- [x] User can add an "or" condition by pressing the plus button at the end of each row.
- [x] User can add an "and" condition by pressing the "and" button below each card container.
- [x] User can see a list of loaded data at the bottom of the page.
- [x] User can see a filtered data list when valid conditions are built.


[Video Demo](https://github.com/gabrielrossetto/condition-builder/assets/42679806/a7f3a6c0-b0b8-4e20-b142-a5f65819b746)

### Supported condition operators:

Each condition supports the following comparisons:

- [x] Equals
- [x] Greater than
- [x] Less than
- [x] Contain
- [x] Not Contain
- [x] Regex

### Requirements:

- [x] Use a recent if not the latest version of React and TypeScript.
- [x] Use MUI for UI components, or another Design System if preferred.
- [x] Avoid using Redux or other state managers to keep the application simple.

### Recommendations:

- [x] Provide input validations for comparison operators like Greater than and Less than.
- [x] Implement visual feedback for users, such as indicating where a new "or" condition will be inserted when hovering over the plus button.

### Next steps / Improvements / Enhancements:

- **Cypress UI Tests:**
  - [ ] *Configuration:* Set up Cypress for UI testing to ensure the application functions correctly from an end-user perspective.
  - [ ] *Improve coverage:* Enhance test coverage to catch more edge cases and ensure robustness.

- **Unit Tests:**
  - [ ] *Increase coverage:* Even if unit tests have been created, explore opportunities to increase further test coverage for components to minimize bugs and improve code quality.

- **UI/UX:**
  - [ ] *Responsive Design:*  Optimize the application layout and styling to adapt seamlessly to different screen sizes and resolutions, ensuring a consistent and user-friendly experience across various devices, including smartphones and tablets.
  - [ ] *Accessibility:* Enhance accessibility features to ensure the application can be used by individuals with disabilities, improving inclusivity and usability.
  - [ ] *Figma Design:* Create a Figma design to visualize and iterate on improvements to the user interface and experience, fostering collaboration and alignment among team members.
  - [ ] *Vitepress:* Transition Components/Hooks Docs from .md to Vitepress for documentation, providing a more structured and customizable platform for documentation.
  - [ ] *Add coverage marker on GitHub:* Integrate coverage markers on GitHub to track and visualize test coverage directly within the repository, facilitating code review and quality assurance processes.

- **Performance and Error Handling:**
  - [ ] *Improve performance:* Optimize application performance to enhance user experience, reduce load times, and ensure smooth interactions.
  - [ ] *Enhance error handling:* Implement robust error handling mechanisms to gracefully handle unexpected errors and provide informative feedback to users, enhancing reliability and user trust.

- **Monitoring and Logs:**
  - [ ] *New Relic Integration:* Set up monitoring and logging using New Relic to monitor application performance, track errors, and gain insights into usage patterns, enabling proactive maintenance and optimization.

---------------------------------------------------------------------


## Installation and Running

1. **Clone the Repository**:
   
   ```bash
   git clone <repository_link>
   cd directory_name

2. **Install Dependencies:**:
   
   ```bash
   npm install

3. **Run the Project:**:
   
   ```bash
   npm run dev

4. **URL:**:

   ```bash
   UI URL: http://localhost:5173/


## Documentation

- [Components Documentation](https://github.com/gabrielrossetto/condition-builder/docs/components.md)
- [Hooks Documentation](https://github.com/gabrielrossetto/condition-builder/docs/hooks.md)
