<?php
require __DIR__ . '/vendor/autoload.php';

use OpenAI\Client;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

echo "AI Mail Agent - Command Line Test\n";
echo "================================\n\n";

try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    
    // Test data
    $openaiApiKey = $_ENV['OPENAI_API_KEY'] ?? 'your-openai-api-key-here';
    $topic = 'Test email about project meeting';
    $senderEmail = 'test@example.com';
    $recipientEmail = 'recipient@example.com';
    
    echo "Testing OpenAI integration...\n";
    echo "API Key: " . (empty($openaiApiKey) ? 'NOT SET' : 'SET') . "\n";
    echo "Topic: $topic\n\n";
    
    if (empty($openaiApiKey) || $openaiApiKey === 'your-openai-api-key-here') {
        echo "❌ Please set your OpenAI API key in .env file\n";
        echo "Create a .env file with: OPENAI_API_KEY=your-actual-key\n\n";
        exit(1);
    }
    
    $openai = OpenAI::client($openaiApiKey);
    
    $prompt = "Napisz krótki formalny e-mail o {$topic}.
    Nadawca: {$senderEmail}
    Odbiorca: {$recipientEmail}
    Napisz profesjonalny email w języku polskim.";
    
    echo "Generating email content...\n";
    $response = $openai->chat()->create([
        'model' => 'gpt-4o-mini',
        'messages' => [
            ['role' => 'user', 'content' => $prompt],
        ],
    ]);
    
    $mailContent = $response['choices'][0]['message']['content'] ?? 'Nie udało się wygenerować treści';
    
    echo "✅ Email generated successfully!\n\n";
    echo "Generated content:\n";
    echo "==================\n";
    echo $mailContent . "\n\n";
    
    echo "Test completed successfully!\n";
    echo "The API is working correctly.\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Please check your configuration and try again.\n";
}
?>
