export function addToLocalStorage(id, item) {
    const itemInStorage = localStorage.getItem(id);
    if (itemInStorage) localStorage.removeItem(id);

    localStorage.setItem(id, JSON.stringify(item));
}

export function removeFromLocalStorage(id) {
    localStorage.removeItem(id);
}