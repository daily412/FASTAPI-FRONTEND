function renderData(data) {
    // Assuming 'data' is an array of objects
    const container = document.getElementById('data-container');
    container.innerHTML = ''; // Clear previous content


    // if (Array.isArray(data) && data.length > 0) {
    //     // Assuming data is an array of objects
    //     const firstItem = data[0];
    //     console.log(firstItem.property); // Log a property of the first item
    //     // Render data on the webpage
    //   } else {
    //     console.error('Invalid data format:', data);
    //   }
      
    // if (data && data.name !== undefined && data.email !== undefined) {
    //     // Render data properties in HTML elements
    //     container.innerHTML = `${data.name}: ${data.email}`;
    //   } else {
    //     console.error('Invalid data format:', data);
    //   }
      
    data.forEach(item => {
      const div = document.createElement('div');
      div.textContent = `ID: ${item[0]}, Name: ${item[1]}, Email: ${item[2]}`; // Assuming data is an array of arrays
      container.appendChild(div);
    });
  }
function fetchData(){
fetch('http://localhost:8000/api/data') // Assuming FastAPI server is running on port 8000 http://localhost:8000/api/data
  .then(response => response.json())
  .then(data => {
    // Data received from the FastAPI server
    console.log(data);
    // Render the data on the web page
    renderData(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

function listDirectories() {
  fetch('http://localhost:8000/list_directories') // Update with your FastAPI server IP
    .then(response => response.json())
    .then(data => {
      renderDirectories(data);
    })
    .catch(error => {
      console.error('Error listing directories:', error);
    });
}

function renderDirectories(directories) {
  const directoryList = document.getElementById('directory-list');
  directoryList.innerHTML = ''; // Clear previous content

  directories.forEach(directory => {
    const listItem = document.createElement('li');
    listItem.textContent = directory;
    directoryList.appendChild(listItem);
  });
}

fetchData();
setInterval(fetchData, 3000); 