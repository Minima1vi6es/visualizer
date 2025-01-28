function encryptText() {
    const text = document.getElementById("text-input").value;
    const algorithm = document.getElementById("algorithm-select").value;

    if (!text) {
        alert("Please enter some text to encrypt.");
        return;
    }

    let encryptedText;
    if (algorithm === "caesar") {
        encryptedText = caesarCipher(text, 3); // Shift by 3
    } else if (algorithm === "base64") {
        encryptedText = btoa(text); // Base64 encoding
    }

    document.getElementById("selected-algorithm").innerText = algorithm;
    document.getElementById("encrypted-text").innerText = encryptedText;
    document.getElementById("output").style.display = "block";
}

function caesarCipher(text, shift) {
    return text
        .split("")
        .map((char) => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const base = char === char.toLowerCase() ? 97 : 65;
                return String.fromCharCode(((code - base + shift) % 26) + base);
            }
            return char; // Leave non-alphabet characters unchanged
        })
        .join("");
}
