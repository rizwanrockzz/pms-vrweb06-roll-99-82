export const getEncryptedOrDecryptedValue = async (value, type) => {
    const res = await fetch('/api/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: value, type: type })
    })

    console.log("response from /api/encrypt");
    let response = await res.json();
    console.log("response");
    console.log(response);

    if (type === "encrypt") {
        return response.encryptedvalue;
    } else {
        return response.decryptedvalue;
    }
}