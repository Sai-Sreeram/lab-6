const applications = []; // Array to store job applications

// Function to add a job application
const addApplication = () => {
    const company = document.getElementById('company').value;
    const position = document.getElementById('position').value;
    const date = document.getElementById('date').value;
    const status = document.getElementById('status').value;

    if (company && position && date && status) {
        applications.push({ company, position, date, status });
        alert('Application added!');
        document.getElementById('jobForm').reset();
    } else {
        alert("Please fill out all fields.");
    }
};

// Function to display applications based on status
const showApplications = (filterStatus) => {
    document.getElementById('form-container').style.display = 'none';
    const applicationList = document.getElementById('application-list');
    applicationList.style.display = 'block';
    applicationList.innerHTML = '';

    // Apply specific styling for "Applied" view
    if (filterStatus === 'applied') {
        applicationList.classList.add('application-list'); // Add styling class for Applied page
    } else {
        applicationList.classList.remove('application-list'); // Remove styling class for other pages
    }

    const filteredApplications = applications.filter(app => app.status === filterStatus);

    if (filteredApplications.length === 0) {
        applicationList.innerHTML = `<p>No applications found for ${filterStatus}.</p>`;
        return;
    }

    // Display each filtered application as a card with action buttons
    filteredApplications.forEach((app, index) => {
        const appDiv = document.createElement('div');
        appDiv.classList.add('application-card');
        appDiv.innerHTML = `
            <h3>${app.position} at ${app.company}</h3>
            <p><strong>Date:</strong> ${app.date}</p>
            <p class="status"><strong>Status:</strong> ${app.status}</p>
            <div class="actions">
                ${getActionButtons(app.status, index)}
            </div>
        `;
        applicationList.appendChild(appDiv);
    });
};

// Helper function to generate action buttons based on current status
const getActionButtons = (currentStatus, index) => {
    let buttons = '';
    if (currentStatus !== 'applied') buttons += `<button onclick="changeStatus(${index}, 'applied')">Move to Applied</button>`;
    if (currentStatus !== 'interviewing') buttons += `<button onclick="changeStatus(${index}, 'interviewing')">Move to Interviewing</button>`;
    if (currentStatus !== 'offered') buttons += `<button onclick="changeStatus(${index}, 'offered')">Move to Offered</button>`;
    if (currentStatus !== 'rejected') buttons += `<button onclick="changeStatus(${index}, 'rejected')">Move to Rejected</button>`;
    return buttons;
};

// Function to change the status of a specific application
const changeStatus = (index, newStatus) => {
    applications[index].status = newStatus;
    showApplications(newStatus); // Update the view to reflect the new status
};

// Function to show the form when "Add Job Application" is selected
const showForm = () => {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('application-list').style.display = 'none';
};

// Event listeners for sidebar links
document.getElementById('link-applied').addEventListener('click', () => showApplications('applied'));
document.getElementById('link-interviewing').addEventListener('click', () => showApplications('interviewing'));
document.getElementById('link-offered').addEventListener('click', () => showApplications('offered'));
document.getElementById('link-rejected').addEventListener('click', () => showApplications('rejected'));
document.getElementById('link-add').addEventListener('click', showForm);
