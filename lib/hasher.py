# create a password encryption module using passlib
from passlib.hash import pbkdf2_sha256 as sha256

def hash_password(password):
    return sha256.hash(password)

def verify_password(password, hash):
    return sha256.verify(password, hash)

def encrypt_text(text):
    return sha256.encrypt(text)

def decrypt_text(text):
    return sha256.decrypt(text)

