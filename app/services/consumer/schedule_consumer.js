const { randomUUID } = require('../../helper/crypto')
const constants = require('../../helper/constants')
const { callApi } = require('../../http/http')
const { getMessageAssociate, getMessageProvider } = require('../../helper/notification_helper')

const db = require("../../models");
const Schedule = db.schedule;

const {
  KAFKA_TOPIC_NOTIFICATION,
  KAFKA_TOPIC_NOTIFICATION_KEY_EMAIL,
  URL_CUSTOMER
} = process.env;

console.log(`env URL_CUSTOMER ${URL_CUSTOMER}`)

async function consumePostShcedule(request) {

  console.log(` ** consumePostShcedule init ** `)

  request = JSON.parse(request.value);

  let associeate = await checkCallApi(returnOptions(`/customers/v1/associetes/${request.associeateUuid}`));
  let provider = await checkCallApi(returnOptions(`/customers/v1/providers/${request.providerUuid}`));
  let partner = await checkCallApi(returnOptions(`/customers/v1/partners/${request.partnerUuid}`));

  console.log(` ** consumePostShcedule salvando **`)

  let item = await save(request, associeate, provider, partner);
  
  console.log(` ** consumePostShcedule finish **`)

  return item;

};

async function save(request, associeate, provider, partner) {

  var item = new Schedule({
    uuid: randomUUID(),
    associeate:{
      uuid: associeate.uuid,
      givenName: associeate.customer.givenName,
      document: associeate.customer.document
    },
    provider:{
      uuid: provider.uuid,
      givenName: provider.customer.givenName,
      document: provider.customer.document
    },
    partner:{
      uuid: partner.uuid,
      givenName: partner.customer.givenName,
      document: partner.customer.document
    },
    occupational: request.occupational,
    city: request.city,
    uf: request.uf,
    scheduled_date: request.scheduledDate,
    scheduled_time: request.scheduledTime,
    status: constants.STATUS.ACTIVE,
    create_at: request.createAt
  });
 
  await item.save(item);

};

async function checkCallApi(path) {

  let retorno = await callApi(path);

  if (retorno.statusCode != 200) {
   
    throw Error(`dados não encontrato ${path}`)
  }

  return JSON.parse(retorno.data);

}


function returnOptions(path) {
  return {
    hostname: URL_CUSTOMER,
    port: 8080,
    path: path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

module.exports = { consumePostShcedule }