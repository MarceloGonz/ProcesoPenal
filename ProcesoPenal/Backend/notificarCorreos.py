import smtplib 
from email.message import EmailMessage



def EnvairCorreo (subject,sender_email,receiver_email,content,password):
    email_subject = subject
    sender_email_address = sender_email
    email_password = password#"semjjhtbjumcdccn"  
    receiver_email_address = receiver_email

    # Configure email headers 
    message = EmailMessage()
    message['Subject'] = email_subject 
    message['From'] = sender_email_address 
    message['To'] = receiver_email_address
    message.set_content(content)


    email_smtp = "smtp.gmail.com"  
    server = smtplib.SMTP(email_smtp, '587')
    server.ehlo() 
    server.starttls()
    server.login(sender_email_address, email_password) 
    server.send_message(message) 
    server.quit()