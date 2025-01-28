function encryptText() {
    const text = document.getElementById("text-input").value;
    const algorithm = document.getElementById("algorithm-select").value;

    if (!text) {
        alert("Please enter some text to encrypt.");
        return;
    }

    let encryptedText;
    switch (algorithm) {
        case "caesar":
            encryptedText = caesarCipher(text, 3); // Caesar Cipher with shift of 3
            break;
        case "base64":
            encryptedText = btoa(text); // Base64 encoding
            break;
        case "reverse":
            encryptedText = reverseCipher(text); // Reverse Cipher
            break;
        case "rot13":
            encryptedText = rot13Cipher(text); // ROT13 Cipher
            break;
        case "vigenere":
            encryptedText = vigenereCipher(text, "KEY"); // Vigenère Cipher with a key
            break;
        case "hex":
            encryptedText = hexEncode(text); // Hexadecimal Encoding
            break;
        default:
            encryptedText = "Unknown algorithm selected.";
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

function reverseCipher(text) {
    return text.split("").reverse().join("");
}

function rot13Cipher(text) {
    return text.replace(/[a-zA-Z]/g, (char) => {
        const base = char <= "Z" ? 65 : 97;
        return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
    });
}

function vigenereCipher(text, key) {
    const keyLength = key.length;
    return text
        .split("")
        .map((char, index) => {
            if (char.match(/[a-z]/i)) {
                const shift = key[index % keyLength].toLowerCase().charCodeAt(0) - 97;
                const base = char === char.toLowerCase() ? 97 : 65;
                return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
            }
            return char; // Leave non-alphabet characters unchanged
        })
        .join("");
}

function hexEncode(text) {
    return text
        .split("")
        .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("");
}
