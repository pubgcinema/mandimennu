document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const otpSection = document.getElementById('otpSection');
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    const otpInput = document.getElementById('otpInput');

    console.log('Form:', form); // Debugging

    if (!form) {
        console.error('Form element not found in the DOM.');
        return;
    }

    const usernameInput = document.getElementById('username');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    console.log('Username Input:', usernameInput);
    console.log('Phone Input:', phoneInput);
    console.log('Email Input:', emailInput);

    let generatedOTP = ""; // To store OTP

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();

        // Simple validation for username and phone
        if (username && phone.length === 10) {
            // Generate a 6-digit random OTP
            generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
            console.log('Generated OTP:', generatedOTP); // Debugging

            // Simulating sending the OTP (e.g., by email or SMS)
            alert(`Temporary OTP: ${generatedOTP}`);  // Simulate OTP sent

            // Hide login form and show OTP section
            form.style.display = 'none';
            otpSection.style.display = 'block';
        } else {
            alert('Please enter a valid Name and 10-digit Phone Number.');
        }
    });

    verifyOtpBtn.addEventListener('click', function() {
        const enteredOtp = otpInput.value.trim();
        if (enteredOtp === generatedOTP) {
            alert('OTP Verified Successfully!');
            console.log('Redirecting to mandimennu/html/home.html...');
            window.location.href = '../mandimennu/html/home.html'; // Final redirect
        } else {
            alert('Invalid OTP. Please try again.');
        }
    });
});
