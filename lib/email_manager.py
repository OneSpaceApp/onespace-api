import os
import smtplib
import ssl

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def sendEmail(receiver, subject, body):
    context = ssl.create_default_context()

    sender = os.environ.get('EMAIL')
    password = os.environ.get('PASS')

    try:
        server = smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context)
        server.login(sender, password)

        msg = MIMEMultipart()
        msg['From'] = sender
        msg['To'] = receiver
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'html'))

        server.sendmail(sender, receiver, msg.as_string())


        server.quit()

        return True
    except:
        raise Exception("Email could not be sent.")

