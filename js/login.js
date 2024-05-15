const pathJsonData = "../data.json";

document
    .getElementById("login-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita que el formulario se envíe

        // Obtener los valores de email y contraseña
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        try {
            // Petición fetch para cargar el archivo JSON
            const response = await fetch(pathJsonData);
            const users = await response.json();

            // Buscar si existe un usuario con el email y contraseña proporcionados
            var userFound = users.find(function (user) {
                return user.email === email && user.password === password;
            });

            if (userFound) {
                // Usuario encontrado, redirigir a la página de inicio
                window.location.href = "/";

                // agregar a localStorage
            } else {
                // Mostrar mensaje de error si no se encuentra el usuario
                alert("Correo electrónico o contraseña incorrectos.")
            }
        } catch (error) {
            console.error("Error al cargar el archivo JSON:", error);
        }
    });
