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

    if(!data.Item){
      return {
        statusCode: 404,
        body: JSON.stringify({error: 'Paciente não existe'},null,2),
      }
    }

    const paciente = data.Item

    return {
      statusCode: 200,
      body: JSON.stringify(paciente,null,2),
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

module.exports.cadastrarPaciente = async (event) => {
  console.log(event)

  let dados = JSON.parse(event.body);

  const {
    telefone,
    data_nascimento,paciente_id,nome,email} = dados;


}
