let latestAIResponse = "";

const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", function () {
    const message = document.getElementById("message").value;
    sendMessage(message);
});

async function sendMessage(message) {

    const responseParagraph = document.getElementById("response");

    if (!message || message.trim() === "") {
        const input = document.getElementById("message");
        message = input.value;
    }

    if (!message || message.trim() === "") return;

    responseParagraph.innerHTML = "Thinking...";

    let dots = 0;

    const thinkingInterval = setInterval(() => {
        dots = (dots + 1) % 4;

        let dotText = ".".repeat(dots);

        responseParagraph.innerHTML = "Thinking" + dotText;
    }, 400);

    try {
        const items = JSON.parse(localStorage.getItem("items")) || [];
        
        const response = await fetch("/api/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message,
                items
            })
        });

        clearInterval(thinkingInterval);

        const data = await response.json();

        responseParagraph.innerHTML = marked.parse(data.reply);

    } catch (error) {
        responseParagraph.textContent = "Error: " + error;
    }
    document.getElementById("message").value = "";
}

window.addEventListener("DOMContentLoaded", function () {

    const savedPrompt = localStorage.getItem("recipePrompt");

    if (savedPrompt) {

        localStorage.removeItem("recipePrompt");

        setTimeout(() => {
            sendMessage(savedPrompt);
        }, 300);
    }
});
