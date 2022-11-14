
const {
    NOTIFICATION_EMAIL_FROM,
    NOTIFICATION_CONFIR_EMAIL_SUBJECT,
    NOTIFICATION_PROVIDER_CONFIR_EMAIL_SUBJECT
  } = process.env;
  
  function getMessageAssociate(request, associeate, provider, partner){
  
    return {
        from: NOTIFICATION_EMAIL_FROM, 
        to: associeate.customer.emails[0].email,  
        subject: NOTIFICATION_CONFIR_EMAIL_SUBJECT,  
        html: `<p> Seu cadastro foi confirmado com sucesso </p> 
               <p> data ${request.scheduledDate} </p> 
               <p> horário da consulta ${request.scheduledTime}</p>
               <p> cidade ${request.city}</p>
               <p> UF ${request.uf}</p>
               <p> Doutor ${provider.customer.givenName}</p>
               <p> Endereço: ${partner.customer.addresses[0].postcode} ${partner.customer.addresses[0].streetName} ${partner.customer.addresses[0].streetNumber} ${partner.customer.addresses[0].district} </p>
               `
      }
}

function getMessageProvider(request, associeate, provider, partner){
  return {
      from: NOTIFICATION_EMAIL_FROM, 
      to: provider.customer.emails[0].email,  
      subject: NOTIFICATION_PROVIDER_CONFIR_EMAIL_SUBJECT,  
      html: `<p> Seu cadastro foi confirmado com sucesso </p> 
             <p> data ${request.scheduledDate} </p> 
             <p> horário da consulta ${request.scheduledTime}</p>
             <p> cidade ${request.city}</p>
             <p> UF ${request.uf}</p>
             <p> cliente ${associeate.customer.givenName}</p>
             <p> Endereço: ${partner.customer.addresses[0].postcode} ${partner.customer.addresses[0].streetName} ${partner.customer.addresses[0].streetNumber} ${partner.customer.addresses[0].district} </p>
             `
    }
}

module.exports = {
    getMessageAssociate,
    getMessageProvider
}