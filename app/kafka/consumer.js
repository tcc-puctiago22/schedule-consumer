const {kafka,KAFKA_CLIENTID,KAFKA_TOPIC_SCHEDULE} = require('./kafka_config')

const {consumePostShcedule} = require('../services/consumer/schedule_consumer')

const consumer = kafka.consumer({groupId:KAFKA_CLIENTID})
 
consumer.connect()
consumer.subscribe({ topic: KAFKA_TOPIC_SCHEDULE, fromBeginning: true })

 
const consumerSchedule = async () => {

  console.log(`*** [consumer]  **** ${KAFKA_CLIENTID}`)
 
 consumer.run({
    autoCommit: true,
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {

            console.log({
                key: message.key.toString(),
                value: message.value.toString(),
                headers: message.headers.toString(),
                partition: partition,
                offset: message.offset
            })
            console.log('*** [consumer] process  init ****')
            await consumePostShcedule(message)
            console.log('*** [consumer] process finsh ****')
        },
	})

}

consumerSchedule().catch(async error => {
    console.error(error)
    try {
      await consumer.disconnect()
    } catch (e) {
      console.error('Failed to gracefully disconnect consumer', e)
    }
    process.exit(1)
  })
