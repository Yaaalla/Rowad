<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect post data
    $first_name = isset($_POST['first_name']) ? htmlspecialchars(strip_tags(trim($_POST['first_name']))) : '';
    $last_name = isset($_POST['last_name']) ? htmlspecialchars(strip_tags(trim($_POST['last_name']))) : '';
    $email = isset($_POST['_replyto']) ? filter_var(trim($_POST['_replyto']), FILTER_SANITIZE_EMAIL) : '';
    $product_interest = isset($_POST['product_interest']) ? htmlspecialchars(strip_tags(trim($_POST['product_interest']))) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(strip_tags(trim($_POST['message']))) : '';

    // Validate inputs
    if (empty($first_name) || empty($last_name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please fill all required fields correctly."]);
        exit;
    }

    // Prepare email
    $to = "sales@alrowad-eg.net";
    $subject = "New Contact Form Submission from $first_name $last_name";
    
    $email_content = "Name: $first_name $last_name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Interested Product: $product_interest\n\n";
    $email_content .= "Message:\n$message\n";

    // Headers
    $headers = "From: no-reply@alrowad-eg.net\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Thank you! Your message has been sent."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Oops! Something went wrong, and we couldn't send your message."]);
    }
} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "There was a problem with your submission, please try again."]);
}
?>
