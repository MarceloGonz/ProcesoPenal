from twilio.rest import Client 

def NotificarAhora(celNumer,mesage,):
    account_sid = 'ACcf42ec61544532c9525d513fd91d3d5c' 
    auth_token = 'bad21316934edfd1ced9d4d9ed48c1a7' 
    client = Client(account_sid, auth_token) 
    message = client.messages.create( 
                                from_='whatsapp:+14155238886',  
                                body=mesage,    
                                to=f'whatsapp:+593{celNumer}'
                            ) 
    
    print(message.status)


