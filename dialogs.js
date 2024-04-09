function returnjson() {
    let path = 'dialogs.json';
    let jsonString;
    fetch(path)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        jsonString = JSON.stringify(data);
        jsonString = JSON.parse(jsonString);
        console.log(jsonString); // Output the stringified JSON
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
    return jsonString;
}

export { returnjson};