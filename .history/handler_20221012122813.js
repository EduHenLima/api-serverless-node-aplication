'use strict';

const listaPacientes = [
  {id: 1, nome: "Maria", dataNascimento: '1992-01-01'},
  {id: 2, nome: "Joeão", dataNascimento: '2000-09-13'},
  {id: 3, nome: "Jose", dataNascimento: '2007-11-29'},
  ];
module.exports.listaPacientes = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        listaPacientes
      },
      null,
      2
    ),
  };
};