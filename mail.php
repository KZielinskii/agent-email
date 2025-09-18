<?php
require __DIR__ . '/vendor/autoload.php';

use OpenAI\Client;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$openai = OpenAI::client($_ENV['OPENAI_API_KEY']); //klucz w .env 

$senderEmail    = readline("Podaj adres e-mail nadawcy (WP.pl): ");
$senderPass     = readline("Podaj hasło do poczty WP: ");
$senderName     = readline("Podaj imię nadawcy: ");

$recipientEmail = readline("Podaj adres e-mail odbiorcy: ");
$recipientName  = readline("Podaj imię odbiorcy: ");

$topic  = readline("O czym ma być mail: ");


$prompt = "Napisz krótki formalny e-mail o {$topic}.
Nadawca ma na imię {$senderName}, a odbiorca {$recipientName}.
Użyj imienia odbiorcy w treści wiadomości.";

$response = $openai->chat()->create([
    'model' => 'gpt-4o-mini',
    'messages' => [
        ['role' => 'user', 'content' => $prompt],
    ],
]);

$mailContent = $response['choices'][0]['message']['content'] ?? 'Nie udało się wygenerować treści';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';


try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.wp.pl';
    $mail->SMTPAuth   = true;
    $mail->Username   = $senderEmail;
    $mail->Password   = $senderPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom($senderEmail, $senderName);
    $mail->addAddress($recipientEmail, $recipientName);

    $mail->isHTML(false);  
    $mail->Subject = 'Zaproszenie na spotkanie';
    $mail->Body    = $mailContent;

    $mail->send();
    echo "✅ Mail został wysłany do {$recipientName} od {$senderName}!\n";
} catch (Exception $e) {
    echo "❌ Błąd: {$mail->ErrorInfo}\n";
}
