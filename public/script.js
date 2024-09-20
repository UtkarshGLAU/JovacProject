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