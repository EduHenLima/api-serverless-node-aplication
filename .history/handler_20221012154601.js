'use strict';

const AWS = require('aws-sdk')
const { v4: uuidv4 } = require("uuid")

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

  } catch (err) {

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

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Paciente não existe' }, null, 2),
      }
    }

    const paciente = data.Item

    return {
      statusCode: 200,
      body: JSON.stringify(paciente, null, 2),
    }
  } catch (err) {

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
  try {
    let dados = JSON.parse(event.body);

    const timestamp = new Date().getTime()

    const { telefone, data_nascimento, nome, email } = dados;

    const paciente = {
      paciente_id: uuidv4(),
      telefone,
      data_nascimento,
      nome,
      email,
      status: true,
      criado_em: timestamp,
      atualizado_em: timestamp
    }

    await dynamoDb
      .put({
        TableName: "PACIENTES",
        Item: paciente
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify("Create user with success"),
    }
  } catch (err) {

    console.log('Error', err)

    return {

      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : 'Exception',
        message: err.message ? err.message : 'Unknow error'
      }),
    }
  }
}

module.exports.obterPaciente = async (event) => {
  try {
    const { pacienteId } = event.pathParameters

    const timestamp = new Date().getTime()

    const { telefone, data_nascimento, nome, email } = dados;

    await dynamoDb
      .update({
        ...params,
          Key: {
            paciente_id: pacienteId
          },
          UpdateExpression:
          'SET name = :nome, data_nascimento = :dt, email = :email,'
          + ' telefone = :telefone, atualizado_em = :atualizado_em',
          ConditionalOperator: 'attribute_exists(paciente_id)',
          ExpressionAttributeValues:{
            ':nome':nome,
            ':dt': data_atualizacao
          }
      })

  } catch (err) {

    console.log('Error', err)

    return {

      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : 'Exception',
        message: err.message ? err.message : 'Unknow error'
      }),
    }
  }
}