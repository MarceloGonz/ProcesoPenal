from twilio.rest import Client 

def NotificarAhora(celNumer,mesage,):
    account_sid = 'ACcf42ec61544532c9525d513fd91d3d5c' 
    auth_token = '1218302d3e78182c3c65407e96cc7483' 
    client = Client(account_sid, auth_token) 
    message = client.messages.create( 
                                from_='whatsapp:+14155238886',  
                                body=mesage,    
                                to=f'whatsapp:+593{celNumer}'
                            ) 
    print(message.status)


