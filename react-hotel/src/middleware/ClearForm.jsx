export const ClearForm = () => {
    document.querySelector('input[type="file"]').value = null;
    document
        .querySelectorAll('input[type="text"], textarea')
        .forEach((input) => (input.value = null));
    document
        .querySelectorAll('input[type="number"]')
        .forEach((input) => (input.value = null));
};
