'use strict';

const pacientes = [
  {id: 1, nome: "Maria", dataNascimento: '1992-01-01'},
  {id: 2, nome: "Joeão", dataNascimento: '2000-09-13'},
  {id: 3, nome: "Jose", dataNascimento: '2007-11-29'},
  ];


module.exports.listarPacientes = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        pacientes
      },
      null,
      2
    ),
  };
};

module.exports.obterPaciente = async (event) => {
  const { pacienteId } = event.pathParameters;

  const paciente = pacientes.find((paciente) => paciente.id = pacienteId)

  if()

  return {
    statusCode: 200,
    body: JSON.stringify(paciente,null,2),
  };
};
