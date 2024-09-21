document.getElementById('summarizeButton').addEventListener('click', async function() {
    const inputText = document.getElementById('inputText').value;

    if (inputText.trim() === '') {
        alert('Please enter some text to summarize.');
        return;
    }

    try {
        const response = await fetch('/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText }), 
        });

        const result = await response.json();
        
        if (result.summary) {
            document.getElementById('outputText').value = result.summary;
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

const fontSize = document.getElementById("size")
fontSize.addEventListener("change", () => {
    document.getElementById("inputText").style.fontSize = fontSize.value;
    document.getElementById("outputText").style.fontSize = fontSize.value;
})

document.getElementById("inputText").addEventListener("input", function() {
    const maxChars = 3000;
    const inputText = document.getElementById("inputText");
    const currentLength = inputText.value.length;

    if (currentLength > maxChars) {
        inputText.value = inputText.value.substring(0, maxChars);
        alert("You have reached the character limit of 3000.");
    }
});





document.getElementById('themeToggleButton').addEventListener('click', function () {
    const body = document.body;
    const header = document.getElementById('header');
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    const buttons = document.querySelectorAll('.button');
    const conat = document.getElementById('main-container')
    
    if (body.style.backgroundColor === 'rgb(18, 32, 47)') {
        body.style.backgroundColor = '#f7f9fc';
        body.style.color = '#333';
        header.style.backgroundColor = '#1a73e8';
        left.style.backgroundColor = '#eef3fc';
        right.style.backgroundColor = '#f1f1f1';

        conat.style.backgroundColor= "white";
        document.getElementById("inputText").style.backgroundColor="#f9fafb"
        document.getElementById("outputText").style.backgroundColor="#f9fafb"

        buttons.forEach(button => {
            button.style.backgroundColor = '#4285f4';
            button.style.color = 'white';
        });
    } else {
        body.style.backgroundColor = '#12202f'; 
        body.style.color = '#d1d9e6';
        header.style.backgroundColor = '#0f3d61'; 
        left.style.backgroundColor = '#1c4e70'; 
        right.style.backgroundColor = '#183a52';

        conat.style.backgroundColor= "black";
        document.getElementById("inputText").style.backgroundColor="#79a4ff"
        document.getElementById("outputText").style.backgroundColor="#79a4ff"
        
        buttons.forEach(button => {
            button.style.backgroundColor = '#0f6ba1';
            button.style.color = '#fff'; 
        });
    }
});
