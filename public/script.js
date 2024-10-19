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
            fetchHistory(); 
        } else {
            alert('Failed to summarize the text.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while summarizing. Please try again.');
    }
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
});

document.getElementById("size").addEventListener("change", function() {
    const fontSize = document.getElementById("size").value;
    document.getElementById("inputText").style.fontSize = fontSize;
    document.getElementById("outputText").style.fontSize = fontSize;
    document.getElementById('historyList').style.fontSize=fontSize;
});

document.getElementById("inputText").addEventListener("input", function() {
    const maxChars = 3000;
    const inputText = document.getElementById("inputText").value;

    if (inputText.length > maxChars) {
        document.getElementById("inputText").value = inputText.substring(0, maxChars);
        alert("You have reached the character limit of 3000.");
    }
});

document.getElementById('themeToggleButton').addEventListener('click', function() {
    const body = document.body;
    const header = document.getElementById('header');
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    const mainContainer = document.getElementById('main-container');
    const historyContainer = document.getElementById('history-container');
    const historyItems = document.querySelectorAll('#historyList li'); 

    const isDarkMode = body.style.backgroundColor === 'rgb(18, 32, 47)';

    if (isDarkMode) {
        body.style.backgroundColor = '#f7f9fc';
        body.style.color = '#333';
        header.style.backgroundColor = '#1a73e8';
        left.style.backgroundColor = '#eef3fc';
        right.style.backgroundColor = '#f1f1f1';
        mainContainer.style.backgroundColor = 'white';
        historyContainer.style.backgroundColor = '#eef3fc';

        document.getElementById("inputText").style.backgroundColor = "#f9fafb";
        document.getElementById("inputText").style.color = "#333";
        document.getElementById("outputText").style.backgroundColor = "#f9fafb";
        document.getElementById("outputText").style.color = "#333";
        console.log(historyItems)
        historyItems.forEach(item => {
            item.style.color = '#333'; 
        });
        
    } else {
        body.style.backgroundColor = '#12202f';
        body.style.color = '#d1d9e6';
        header.style.backgroundColor = '#0f3d61';
        left.style.backgroundColor = '#1c4e70';
        right.style.backgroundColor = '#183a52';
        mainContainer.style.backgroundColor = 'black';
        historyContainer.style.backgroundColor = '#1c4e70';

        document.getElementById("inputText").style.backgroundColor = "#79a4ff";
        document.getElementById("inputText").style.color = "white";
        document.getElementById("outputText").style.backgroundColor = "#79a4ff";
        document.getElementById("outputText").style.color = "white";

        historyItems.forEach(item => {
            item.style.color = 'white'; 
        });
    }
});

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
document.getElementById('history-container-btn').addEventListener('click', function() {
    const historyContainer = document.getElementById('history-container');
    const historyList = document.getElementById('historyList');
    const mainContainer =document.getElementById('main-container')

    if (historyList.style.display === 'none' || !historyList.style.display) {
        historyList.style.display = 'block';
        historyContainer.style.padding="10px";
        historyContainer.style.display='flex';
        mainContainer.style.display='none';
    } else {
        historyList.style.display = 'none';
        historyContainer.style.padding="0px";
        historyContainer.style.display='none';
        mainContainer.style.display='flex';
    }
});