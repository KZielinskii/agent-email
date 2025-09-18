<?php
// Simple test script for the mail.php API
echo "Testing AI Mail Agent API...\n\n";

// Test data
$testData = [
    'action' => 'generate',
    'openaiApiKey' => 'test-key',
    'emailTopic' => 'Test email topic',
    'senderEmail' => 'test@example.com',
    'recipientEmail' => 'recipient@example.com'
];

// Test generate action
echo "Testing generate action...\n";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost/mail.php');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($testData));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode\n";
echo "Response: $response\n\n";

echo "API test completed.\n";
echo "Make sure your web server is running and mail.php is accessible.\n";
?>
