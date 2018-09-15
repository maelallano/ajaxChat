// display of messages from db in the chat | method=GET
function getMessages() {
    const requeteAjax = new XMLHttpRequest();
    requeteAjax.open("GET", "handler.php");

    // HTML structure of messages with templating
    requeteAjax.onload = function() {
        const resultat = JSON.parse(requeteAjax.responseText);
        const html = resultat.reverse().map(function(message) {
            return `
            <div class="singleMess">
            <p class="singleMess__author">${message.author}: </p>
            <p class="singleMess__content">${message.content}</p>
            <p class="singleMess__date">à ${message.created_at.substring(11, 16)}</p>
            </div>
            `
        }).join('');

        const messages = document.querySelector('.messagesContainer');

        messages.innerHTML = html;
        messages.scrollTop = messages.scrollHeight;
    }

    requeteAjax.send();
}

// insert message into the db | method=POST
function postMessage(event) {
    event.preventDefault();

    const content = document.querySelector('.sendMessForm__input');

    const data = new FormData();
    data.append('author', author);
    data.append('content', content.value);

    const requeteAjax = new XMLHttpRequest();
    requeteAjax.open('POST', 'handler.php?task=write');

    // clear field and render the new messages
    requeteAjax.onload = function() {
        content.value = '';
        content.focus();
        getMessages();
    }

    requeteAjax.send(data);
}

// $author or Anon if prompt null
let author = prompt('Enter you name: ');

if (author === "" || author === null || author === undefined) {
    author = "Anon";
}

document.querySelector('form').addEventListener('submit', postMessage);

// refresh every 3s to render the possible new messages
const interval = window.setInterval(getMessages, 3000);

getMessages();