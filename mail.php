<?php
require __DIR__ . '/vendor/autoload.php';

use OpenAI\Client;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Check if running from command line
if (php_sapi_name() === 'cli') {
    echo "AI Mail Agent - Command Line Test\n";
    echo "================================\n\n";
    echo "This script is designed to work as a web API.\n";
    echo "To test it properly, use a web server or run:\n";
    echo "php -S localhost:8000\n\n";
    echo "Then access: http://localhost:8000/mail.php\n\n";
    exit();
}

// Set CORS headers for frontend communication
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }
    
    $action = $input['action'] ?? '';
    
    if ($action === 'generate') {
        // Generate email content
        $openaiApiKey = $input['openaiApiKey'] ?? $_ENV['OPENAI_API_KEY'];
        $topic = $input['emailTopic'] ?? '';
        $senderEmail = $input['senderEmail'] ?? '';
        $recipientEmail = $input['recipientEmail'] ?? '';
        
        if (empty($openaiApiKey) || empty($topic)) {
            throw new Exception('Missing required fields for generation');
        }
        
        $openai = OpenAI::client($openaiApiKey);
        
        $prompt = "Napisz krótki formalny e-mail o {$topic}.
        Nadawca: {$senderEmail}
        Odbiorca: {$recipientEmail}
        Napisz profesjonalny email w języku polskim.";
        
        $response = $openai->chat()->create([
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);
        
        $mailContent = $response['choices'][0]['message']['content'] ?? 'Nie udało się wygenerować treści';
        
        // Return generated content
        echo json_encode([
            'success' => true,
            'content' => $mailContent,
            'message' => 'Email został wygenerowany pomyślnie'
        ]);
        
    } elseif ($action === 'send') {
        // Send email
        $senderEmail = $input['senderEmail'] ?? '';
        $senderPassword = $input['senderPassword'] ?? '';
        $recipientEmail = $input['recipientEmail'] ?? '';
        $host = $input['host'] ?? 'smtp.gmail.com';
        $emailContent = $input['emailContent'] ?? '';
        $subject = $input['subject'] ?? 'Wiadomość wygenerowana przez AI';
        
        if (empty($senderEmail) || empty($senderPassword) || empty($recipientEmail) || empty($emailContent)) {
            throw new Exception('Missing required fields for sending');
        }
        
        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        
        $mail->isSMTP();
        $mail->Host = $host;
        $mail->SMTPAuth = true;
        $mail->Username = $senderEmail;
        $mail->Password = $senderPassword;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        
        $mail->setFrom($senderEmail);
        $mail->addAddress($recipientEmail);
        
        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body = $emailContent;
        
        $mail->send();
        
        echo json_encode([
            'success' => true,
            'message' => 'Email został wysłany pomyślnie!'
        ]);
        
    } else {
        throw new Exception('Invalid action');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
