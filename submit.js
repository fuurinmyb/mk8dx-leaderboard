document.getElementById("time-submit-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Get the values from the form
  const track = document.getElementById("track").value;
  const category = document.getElementById("category").value;
  const country = document.getElementById("country").value;
  const player = document.getElementById("player").value;
  const time = document.getElementById("time").value;
  const screenshot = document.getElementById("screenshot").value;

  // Regular expression for validating time in mm:ss.mmm format
  const timeRegex = /^([0-9]{1}):([0-9]{2})\.([0-9]{3})$/;

  // Test if the time matches the regex
  if (!timeRegex.test(time)) {
    alert("Please enter the time in the correct format: mm:ss.mmm (e.g., 01:45.123).");
    return; // Stop the form submission if the time format is incorrect
  }

  // Convert the time to a sortable number (in seconds)
  const timeParts = time.split(':');
  const minutes = parseInt(timeParts[0]);
  const seconds = parseFloat(timeParts[1]);
  const totalTimeInSeconds = (minutes * 60) + seconds;

  // Get the current leaderboard data from localStorage or initialize as an empty array
  let leaderboardData = JSON.parse(localStorage.getItem(track)) || [];

  // Create a new entry
  const newEntry = {
    track: track,
    category: category,
    country: country,
    player: player,
    time: time,
    screenshot: screenshot,
    totalTimeInSeconds: totalTimeInSeconds
  };

  // Add the new entry to the leaderboard data
  leaderboardData.push(newEntry);

  // Sort the leaderboard by time (ascending)
  leaderboardData.sort((a, b) => a.totalTimeInSeconds - b.totalTimeInSeconds);

  // Save the updated leaderboard data back to localStorage
  localStorage.setItem(track, JSON.stringify(leaderboardData));

  // Redirect to the leaderboard page
  window.location.href = '150cc-meta-nita.html'; // Change to your leaderboard page
});
