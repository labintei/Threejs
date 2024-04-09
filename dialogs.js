let path = 'dialogs.json';
    let json;
    fetch(path)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        json = JSON.stringify(data);
        json = JSON.parse(json);
        console.log(json); // Output the stringified JSON
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

function returnjson() {

    return json;
}

export { returnjson};