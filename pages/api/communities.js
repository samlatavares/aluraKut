import { SiteClient } from 'datocms-client';

export default async function receiveRequests(request, response) {
  if (request.method === 'POST') {
    const TOKEN = '7bfb74a9d9601f5e496d8f475528fe';
    const client = new SiteClient(TOKEN);

    // Validar os dados, antes de sair cadastrando
    const registroCriado = await client.items.create({
      itemType: '968398', // ID do Model de "Communities" criado pelo Dato
      ...request.body,
    })

    response.json({
      registroCriado: registroCriado,
    })
    return;
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas POST tem!'
  })
}