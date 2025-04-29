document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#loginForm');

    if (!form) {
        console.error('Form element not found in the DOM.');
        return;
    }

    const usernameInput = document.getElementById('username');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    // Google Form submission URL and field IDs
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdquhtN84EThV_DqqlWd7npo6zGFjiJBtpEi4-iXd-OjgEQvg/formResponse';
    const NAME_FIELD_ID = 'entry.1066932402';
    const EMAIL_FIELD_ID = 'entry.935020121';
    const PHONE_FIELD_ID = 'entry.1272056966';

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();

        // Basic validation for username
        if (!username) {
            alert('Please enter a valid Name.');
            return;
        }

        // Validate phone number if provided
        if (phone && !/^[0-9]{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit Phone Number.');
            return;
        }

        // Function to submit data to Google Form
        async function submitToGoogleForm(username, email, phone) {
            const formData = new FormData();
            formData.append(NAME_FIELD_ID, username);
            formData.append(EMAIL_FIELD_ID, email);
            formData.append(PHONE_FIELD_ID, phone);

            try {
                await fetch(GOOGLE_FORM_URL, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors' // Required for Google Forms
                });
                console.log('Data sent to Google Form successfully.');
            } catch (err) {
                console.error('Error submitting to Google Form:', err);
            }
        }

        // Submit to Google Form in the background
        submitToGoogleForm(username, email, phone);

        // Redirect to home page after (attempting) submission
        window.location.href = '../mandimennu/html/home.html';
    });
});