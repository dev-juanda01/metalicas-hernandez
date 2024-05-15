const pathJsonData = "../data.json";

document
    .getElementById("register-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita que el formulario se envíe

        // Obtener los valores de email y contraseña
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        try {
            // Petición fetch para cargar el archivo JSON
            const response = await fetch(pathJsonData);
            const users = await response.json();

            // Verificar si el email ya está registrado
            const emailExists = users.find((user) => user.email === email);
            if (emailExists) {
                alert("El correo electrónico ya está registrado.");
                return;
            }

            // Agregar el nuevo usuario
            const newUser = { email, password };
            const updatedUsers = [...users, newUser];

            // Actualizar el archivo JSON con los nuevos datos
            const updatedUsersJSON = JSON.stringify(updatedUsers);
            const updatedResponse = await fetch(pathJsonData, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: updatedUsersJSON,
            });

            if (updatedResponse.ok) {
                alert("¡Registro exitoso!");
                window.location.href = "login.html"; // Redirigir a la página de inicio de sesión
            } else {
                alert("Intentalo mas tarde");
                throw new Error("Error al actualizar el archivo JSON.");
            }
        } catch (error) {
            console.error("Error durante el registro:", error);
        }
    });
