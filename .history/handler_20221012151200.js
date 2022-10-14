'use strict';

const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: "PACIENTES"
}

module.exports.listarPacientes = async (event) => {
  try {
    let data = await dynamoDb.scan(params).promise()
    
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };

  } catch(err) {

    console.log('Error', err)

    return {

      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({ 
        error: err.name ? err.name : 'Exception',
        message: err.message ? err.message : 'Unknow error'
       }),
    }
  }
};

module.exports.obterPaciente = async (event) => {
  try {
    const { pacienteId } = event.pathParameters

    const data = await dynamoDb
      .get({
        ...params,
        Key: {
          paciente_id: pacienteId
        }
      })
      .promise()

    if(!data.Items){
      return {
        
      }
    }
  } catch(err) {

    console.log('Error', err)

    return {

      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({ 
        error: err.name ? err.name : 'Exception',
        message: err.message ? err.message : 'Unknow error'
       }),
    }
  }
  
};
