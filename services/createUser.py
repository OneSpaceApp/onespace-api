import re
import time
import random
import os
from lib.email_manager import sendEmail
from lib.hasher import hash_password
from lib.database import mongodb as db

def createUser(name, surname, email, password, birth: str):
    name = name.capitalize()
    surname = surname.capitalize()

    if not re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email):
        raise ValueError("Correo inválido")

    if len(password) < 8:
        raise ValueError("La contraseña debe tener al menos 8 caracteres")

    if len(password) > 100:
        raise ValueError("La contraseña no puede tener más de 100 caracteres")

    if len(name) < 2:
        raise ValueError("El nombre debe tener al menos 2 caracteres")

    if len(name) > 150:
        raise ValueError("El nombre no puede tener más de 150 caracteres")

    if len(surname) < 1:
        raise ValueError("El apellido debe tener al menos 1 caracter")

    if len(surname) > 150:
        raise ValueError("El apellido no puede tener más de 150 caracteres")

    parsedBirth = time.strptime(birth, "%d/%m/%Y")

    if parsedBirth.tm_year < 1900:
        raise ValueError("La fecha de nacimiento no puede ser menor a 1900")

    if parsedBirth.tm_year > time.localtime().tm_year - 14:
        raise ValueError("La edad debe ser mayor a 14 años")

    password = hash_password(password)
    randomNumber = random.randint(1000, 9999)

    user = db.db.users.find_one({'email': email})

    if user is not None:
        raise ValueError("El correo ya está registrado")

    emailBody = """
    Hola {}!
    Tu codigo de verificacion de <b style="color: #300070">Spaces.IO</b> es: <b style="color: #300070">{}</b>
    <br />
    <hr />
    <i>Si no has solicitado una cuenta en <b>Spaces.IO</b>, ignora este correo.</i>
    <br />
    <i>Este correo fue enviado automaticamente, por favor no responda a este correo.</i>
                """.format(name, randomNumber)

    sendEmail(email, "Verification code to Spaces.IO", emailBody)

    user = {
        'name': name,
        'surname': surname,
        'email': email,
        'password': password,
        'birth': birth,
        'code': randomNumber,
    }

    return user
