<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');


$data = json_decode(file_get_contents("php://input"), true);
$url = $data['url'];
$videoid = $data['videoid'];
// Check if URL is valid
if (!$url) {
    echo json_encode(['error' => 'Invalid or missing YouTube URL']);
    exit;
}

try {
    // Create unique filename
    $outputFile = $videoid . '.mp3';

    // Build shell command (save output inside a folder e.g., mp3/)
    // $command = escapeshellcmd("yt-dlp -x --audio-format mp3 -o \"mp3/$outputFile\" \"$url\"");

    // Full path to yt-dlp.exe
    $ytDlpPath = 'C:\\yt-dlp\\yt-dlp_x86.exe';
    $ffmpegPath = 'C:\\ffmpeg\\ffmpeg\\bin\\ffmpeg.exe'; // ffmpeg for convert into mp3

    $urll = "https://www.youtube.com/watch?v=A-h05KFC_7c";

    // Build shell command (save output inside a folder e.g., mp3/)
    // $command = "\"$ytDlpPath\" -x --audio-format mp3 --audio-quality 0 -o \"mp3/$outputFile\" https://www.youtube.com/watch?v=_EPsFJVcdso";
    $command = "\"$ytDlpPath\" -x --audio-format mp3 --ffmpeg-location \"$ffmpegPath\" -o \"mp3/$outputFile\" \"$url\"";

    // Run the command
    exec($command, $output, $returnCode);

    // Check success
    if ($returnCode === 0 && file_exists("mp3/$outputFile")) {
        echo json_encode([
            'downloadUrl' => "http://localhost/esound/backend/mp3/$outputFile"
        ]);
    } else {
        echo json_encode([
            'error' => 'Conversion failed',
            'output' => $output,
            'returnCode' => $returnCode,
            'command' => $command
        ]);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
