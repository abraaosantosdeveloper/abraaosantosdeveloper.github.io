document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    var form = e.target;
    var data = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Email enviado com sucesso!');
            form.reset();  // Limpa os campos do formulário após o envio bem-sucedido
        } else {
            response.json().then(data => {
                if (Object.hasOwnProperty.call(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    alert('Erro ao enviar email');
                }
            });
        }
    }).catch(error => {
        alert('Erro ao enviar email: ' + error.message);
    });
});