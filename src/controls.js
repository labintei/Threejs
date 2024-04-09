
function updatePointPosition(point, rotation) {

    if (keys['KeyA'] || keys['ArrowLeft']) {
        const stepX = -Math.cos(rotation.y);
        const stepZ = Math.sin(rotation.y);
        point.x += stepX * 0.1;
        point.z += stepZ * 0.1;
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
        const stepX = Math.cos(rotation.y);
        const stepZ = -Math.sin(rotation.y);
        point.x += stepX * 0.1;
        point.z += stepZ * 0.1;
    }
    if (keys['KeyW'] || keys['ArrowUp']) {
        const stepX = -Math.sin(rotation.y);
        const stepZ = -Math.cos(rotation.y);
        point.x += stepX * 0.2;
        point.z += stepZ *  0.2;
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
        const stepX = Math.sin(rotation.y);
        const stepZ = Math.cos(rotation.y);
        point.x += stepX * 0.2;
        point.z += stepZ *  0.2;
    }
}

const keys = {};


function handleKeyDown(event) {
    keys[event.code] = true;
}


function handleKeyUp(event) {
    keys[event.code] = false;
}


document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function update(point, rotation) {
    updatePointPosition(point, rotation);
    //requestAnimationFrame(update);
}

// Appeler la fonction update pour commencer la mise à jour des coordonnées du point
export { update}