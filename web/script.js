function showArtistSearch() {
    clearResults();
    const searchInputs = document.getElementById('searchInputs');
    searchInputs.innerHTML = `
      <input type="text" id="artistQuery" placeholder="Enter artist name...">
      <button onclick="searchArtists()"><div class="span">🔎</div></button>
    `;
  }
  
  function showTrackSearch() {
    clearResults();
    const searchInputs = document.getElementById('searchInputs');
    searchInputs.innerHTML = `
      <input type="text" id="trackQuery" placeholder="Enter track name...">
      <button onclick="searchTracks()"><div class="span">🔎</div></button>
    `;
  }
  
  function showTopTracks() {
    clearResults();
    fetchTopTracks();
  }
  
  function searchArtists() {
    const artistQuery = document.getElementById('artistQuery').value.trim();
    if (artistQuery === '') {
      alert('Please enter an artist name');
      return;
    }
    fetch(`https://matchmytaste.onrender.com/search_artist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: artistQuery })
    })
    .then(response => response.json())
    .then(data => displayResults(data, 'artist'))
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again later.');
    });
  }
  
  function searchTracks() {
    const trackQuery = document.getElementById('trackQuery').value.trim();
    if (trackQuery === '') {
      alert('Please enter a track name');
      return;
    }
    fetch(`https://matchmytaste.onrender.com/search_track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: trackQuery })
    })
    .then(response => response.json())
    .then(data => displayResults(data, 'track'))
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again later.');
    });
  }
  
  function fetchTopTracks() {
    clearResults();
    fetch(`https://matchmytaste.onrender.com/top_tracks_of_month`, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => displayResults(data, 'top_tracks'))
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again later.');
    });
  }
  
  function displayResults(data, type) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
  
    switch (type) {
      case 'artist':
        data.forEach(item => {
          const card = createCard(item.name, `Artist: ${item.name}`, item.url);
          resultsContainer.appendChild(card);
        });
        break;
      case 'track':
        data.forEach(item => {
          const card = createCard(item.name, `Track by ${item.artists}`, item.url);
          resultsContainer.appendChild(card);
        });
        break;
      case 'top_tracks':
        data.forEach(track => {
          const card = createCard(track.name, `Artist: ${track.artists}`, track.url);
          resultsContainer.appendChild(card);
        });
        break;
    }
  }
  
  function createCard(name, subtitle, url) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${name}</h3>
      <p>${subtitle}</p>
      <a href="${url}" target="_blank">Listen on Spotify</a>
    `;
    return card;
  }
  
  function clearResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    const searchInputs = document.getElementById('searchInputs');
    searchInputs.innerHTML = '';
  }
  
  // Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {

  let quantumTimeout; // Variable to store timeout ID
  let cursorVisible = true; // Flag to track cursor visibility

  // Add event listener for mousemove to track pointer movement
  document.addEventListener("mousemove", function(event) {
    
    // Clear previous timeout
    clearTimeout(quantumTimeout);
    
    // Remove existing quantum element if it exists
    removeQuantumElement();
    
    // Start a new timeout to show quantum after 5 seconds of inactivity
    quantumTimeout = setTimeout(function() {
      const quantum = createQuantumElement(event.clientX, event.clientY);
      document.body.appendChild(quantum);
      cursorVisible = false; // Set flag to indicate cursor should be hidden
      document.body.style.cursor = "none"; // Hide cursor
    }, 5000);
  });

  // Add event listener to restore cursor visibility on mousemove
  document.addEventListener("mousemove", function() {
    if (!cursorVisible) {
      cursorVisible = true; // Reset flag
      document.body.style.cursor = "auto"; // Show cursor
      removeQuantumElement(); // Remove quantum element if it exists
    }
  });

  // Function to create the quantum element at the specified coordinates
  function createQuantumElement(x, y) {
    const quantum = document.createElement("l-quantum");
    quantum.setAttribute("size", "45");
    quantum.setAttribute("speed", "1.75");
    quantum.setAttribute("color", "white");
    quantum.style.position = "absolute";
    quantum.style.left = x + "px";
    quantum.style.top = y + "px";
    return quantum;
  }

  // Function to remove the quantum element
  function removeQuantumElement() {
    const existingQuantum = document.querySelector("l-quantum");
    if (existingQuantum) {
      existingQuantum.remove();
    }
  }

  // Function GFG_Fun to add class and update text
  function GFG_Fun() {
    let elm = document.getElementById('GFG');
    let body = document.body; // Use document.body to refer to the body element directly
    
    body.classList.add("newClass");
    elm.innerHTML = "Cursor is removed from body!";
  }

});
