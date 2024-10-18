// Summarize Button Functionality
document.getElementById('summarizeButton').addEventListener('click', async function() {
    const inputText = document.getElementById('inputText').value;

    if (inputText.trim() === '') {
        alert('Please enter some text to summarize.');
        return;
    }

    try {
        const response = await fetch('/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: inputText }),
        });
        const result = await response.json();
        
        if (result.summary) {
            document.getElementById('outputText').value = result.summary;
            fetchHistory(); // Fetch history after summarizing
        } else {
            alert('Failed to summarize the text.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while summarizing. Please try again.');
    }
});

// Clear Button Functionality
document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
});

// Font Size Change Functionality
document.getElementById("size").addEventListener("change", function() {
    const fontSize = document.getElementById("size").value;
    document.getElementById("inputText").style.fontSize = fontSize;
    document.getElementById("outputText").style.fontSize = fontSize;
});

// Character Limit Functionality for Input Text
document.getElementById("inputText").addEventListener("input", function() {
    const maxChars = 3000;
    const inputText = document.getElementById("inputText").value;

    if (inputText.length > maxChars) {
        document.getElementById("inputText").value = inputText.substring(0, maxChars);
        alert("You have reached the character limit of 3000.");
    }
});

// Theme Toggle Functionality
document.getElementById('themeToggleButton').addEventListener('click', function() {
    const body = document.body;
    const header = document.getElementById('header');
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    const mainContainer = document.getElementById('main-container');
    const historyContainer = document.getElementById('history-container');
    const historyItems = document.querySelectorAll('#historyList li'); // Select all <li> elements

    // Toggle based on current background color
    const isDarkMode = body.style.backgroundColor === 'rgb(18, 32, 47)';

    if (isDarkMode) {
        // Light Mode
        body.style.backgroundColor = '#f7f9fc';
        body.style.color = '#333';
        header.style.backgroundColor = '#1a73e8';
        left.style.backgroundColor = '#eef3fc';
        right.style.backgroundColor = '#f1f1f1';
        mainContainer.style.backgroundColor = 'white';
        historyContainer.style.backgroundColor = '#eef3fc';

        // Update text color for input and output
        document.getElementById("inputText").style.backgroundColor = "#f9fafb";
        document.getElementById("inputText").style.color = "#333";
        document.getElementById("outputText").style.backgroundColor = "#f9fafb";
        document.getElementById("outputText").style.color = "#333";
        console.log(historyItems)
        // Update <li> elements in light mode
        historyItems.forEach(item => {
            item.style.color = '#333'; // Change color for light mode
        });
        
    } else {
        // Dark Mode
        body.style.backgroundColor = '#12202f';
        body.style.color = '#d1d9e6';
        header.style.backgroundColor = '#0f3d61';
        left.style.backgroundColor = '#1c4e70';
        right.style.backgroundColor = '#183a52';
        mainContainer.style.backgroundColor = 'black';
        historyContainer.style.backgroundColor = '#1c4e70';

        // Update text color for input and output
        document.getElementById("inputText").style.backgroundColor = "#79a4ff";
        document.getElementById("inputText").style.color = "white";
        document.getElementById("outputText").style.backgroundColor = "#79a4ff";
        document.getElementById("outputText").style.color = "white";

        // Update <li> elements in dark mode
        historyItems.forEach(item => {
            item.style.color = 'white'; // Change color for dark mode
        });
    }
});

// Fetch and Display the History from the Server
async function fetchHistory() {
    try {
        const response = await fetch('/history');
        const data = await response.json();
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';

        data.history.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.date}: ${item.summary}`;
            historyList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching history:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchHistory);
