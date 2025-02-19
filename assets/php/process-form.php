<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    // Set the email recipient (your email address)
    $to = "muhammadmunimoff330@gmail.com"; // Replace with your actual email

    // Create the email subject and body
    $email_subject = "New Message from: $name - $subject";
    $email_body = "You have received a new message from your website form:\n\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Message:\n$message\n";

    // Email headers
    $headers = "From: $email";

    // Send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Thank you! Your message has been sent successfully.";
    } else {
        echo "Oops! Something went wrong. Please try again.";
    }
}
?>
