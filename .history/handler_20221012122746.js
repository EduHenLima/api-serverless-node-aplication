'use strict';

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
