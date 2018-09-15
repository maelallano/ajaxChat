<?php
// db connection
$db = new PDO('mysql:host=localhost;dbname=chat;charset=utf8', 'root', 'root');

// initialize $task and choose between rendering or getting messages from db | method=GET
$task = "list";
if (isset($_GET['task'])) {
    $task = $_GET['task'];
}
if ($task == "write") {
    postMessage();
} else {
    getMessages();
}

// get messages from db
function getMessages() {
    global $db;

    // select last 20 messages from db oredered by date
    $resultats = $db->query("SELECT * FROM messages ORDER BY created_at DESC LIMIT 20");
    $messages = $resultats->fetchAll();
    echo json_encode($messages);
}

// insert message into the db | method=POST
function postMessage() {
    global $db;

    // check if $_POST of author or content exist, return if not
    if (!isset($_POST['author']) || !isset($_POST['content'])) {
        echo json_encode(["status" => "error", "message" => "One field or many have not been sent"]);

        return;
    }

    $author = $_POST['author'];
    $content = $_POST['content'];

    // insert message into the db with a query
    $query = $db->prepare('INSERT INTO messages SET author = :author, content = :content, created_at = NOW()');
    $query->execute([
        "author" => $author,
        "content" => $content
    ]);

    echo json_encode(["status" => "success"]);
}