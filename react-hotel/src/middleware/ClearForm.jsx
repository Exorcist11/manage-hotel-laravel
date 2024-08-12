export const ClearForm = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.value = null;
    }

    const textInputs = document.querySelectorAll(
        'input[type="text"], textarea'
    );
    if (textInputs.length > 0) {
        textInputs.forEach((input) => (input.value = null));
    }

    const numberInputs = document.querySelectorAll('input[type="number"]');
    if (numberInputs.length > 0) {
        numberInputs.forEach((input) => (input.value = null));
    }

    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        dateInputs.forEach((input) => (input.value = null));
    }
};
