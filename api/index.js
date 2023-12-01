const { complianceContainer, onboardingContainer, legalContainer } = require('./bdConfig');

// server variables
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const jsonParser = bodyParser.json();

const options = {
  enableCrossPartitionQuery: true,
}

app.post('/consultLead', jsonParser, async function (req, res) {
  const query = `SELECT * FROM c WHERE c.identityDocument.number = '${req.body.dni}' `

  const querySpec = {
    query,
    parameters: [],
  }
  const { resources: items } = await onboardingContainer
    .items
    .query(querySpec, options)
    .fetchAll()

  if (items[0]) {
    res.send('USUARIO REGISTRADO')
  } else {
    res.send('USUARIO NO ENCONTRADO')
  }
})

app.post('/addLead', jsonParser, async function (req, res) {
  const newItem = {
    emailAdress: req.body.emailAdress,
    identityDocument: req.body.identityDocument,
    terms: req.body.terms,
    is_ibk: req.body.is_ibk,
    is_sab: req.body.is_sab,
    emailAdress_sab: req.body.emailAdress_sab,
    companyJoined: req.body.companyJoined,
    date_registered: req.body.date,
    accountIdentifier: req.body.accountIdentifier,
    completed_profile_percentage: 0,
    confirm_ibk_mail: req.body.confirm_ibk_mail,
    ibk_acceptance: req.body.ibk_acceptance,
    emailAdress_initial: req.body.emailAdress_initial,
    idContactCRM: req.body.idContactCRM,
    route: req.body.route,
  }

  const { resource: createdItem } = await onboardingContainer.items.create(newItem);

  res.send(createdItem)
});

const getLegalInformacion = async (id) => {
  const queryGetLegal = `SELECT * FROM c WHERE c.onboardingId = '${id}' and c.stage = 'alta' and c.status = 'active'`;

  const { resources: legals } = await legalContainer
    .items
    .query({ query: queryGetLegal }, options)
    .fetchAll();
  return !!legals?.length ? legals[0] : undefined;
}

app.post('/getLead', jsonParser, async function (req, res) {
  const queryGetLead = `SELECT * FROM c WHERE c.accountIdentifier = '${req.body.cuenta}'`

  const querySpec = {
    query: queryGetLead
  }

  try {
    const { resources: items } = await onboardingContainer
      .items
      .query(querySpec, options)
      .fetchAll();
    const lead = items[0];

    const legalInformacion = await getLegalInformacion(lead.id);

    if (legalInformacion) {
      lead.legal_information = legalInformacion;
    }

    res.send(lead);
  } catch (error) {
    res.send('Error al traer los datos: ' + error);
  }
});

app.post('/get-account-identifier', jsonParser, async function (req, res) {
  const query = `SELECT * FROM c WHERE c.identityDocument.number = '${req.body.dni}' and c.identityDocument.type = '${req.body.tipo}'`

  const querySpec = {
    query,
    parameters: [],
  }

  const { resources: items } = await onboardingContainer
    .items
    .query(querySpec, options)
    .fetchAll();
  res.send(items);

});

app.post('/user-data', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.cellphone = req.body.cellphone
  element.user_data_completed = req.body.user_data_completed
  element.date_user_information = req.body.date_user_information

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Datos de usuario actualizado')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/personal-information', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.personal_information = req.body.personal_information;

  if (!!req.body.emailAdress) {
    element.emailAdress = req.body.emailAdress;
  }

  if (!!req.body.cellphone) {
    element.cellphone = req.body.cellphone;
  }

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Datos de usuario actualizado')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/couple-information', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.couple_information = req.body.couple_information

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/annexed-w9', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.annexed_w9 = req.body.annexed_w9

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/annexed-w8', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.annexed_w8 = req.body.annexed_w8

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/job-information', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.job_information = req.body.job_information

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/independent_client', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.independent_client = req.body.independent_client

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/financial-information', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.financial_information = req.body.financial_information

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/main-bank-account', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.main_bank_ccount = req.body.main_bank_ccount

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/legal-information', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id);
  try {
    if (element.is_observed_pep === true) {
      const history = !element.history ? [] : element.history;
      history.push({
        reason: "Remover observación PEP",
        modified_date: new Date(),
      });
    }
    element.is_observed_pep = undefined;
    const { resource: result } = await legalContainer.scripts.storedProcedure('saveLegalInformation').execute(undefined, [req.body.id, req.body.legal_information, req.body.isUpdate]);
    await onboardingContainer.item(req.body.id).replace(element);
    res.send(result)
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/annexed-pep', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.annexed_pep = req.body.annexed_pep

  try {
    await onboardingContainer.item(req.body.id).replace(element);
    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/completed-percentage', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id);
  const percentage = parseInt(req.body.completed_profile_percentage, 10);

  element.completed_profile_percentage = percentage > 100 ? 100 : percentage;

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/ibk-acceptance', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.ibk_acceptance = req.body.ibk_acceptance

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/equifax-information', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.equifax_information = req.body.equifax_information
  element.equifax_values = req.body.equifax_values

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/compliance-information', jsonParser, async function (req, res) {

  try {
    const { resource: result } = await complianceContainer.scripts.storedProcedure('saveComplianceInformation').execute(undefined, [req.body.id, req.body.compliance_information, req.body.isUpdate]);

    res.send(result)
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})

app.post('/crm-information', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.crm_information = req.body.crm_information

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/rut-information', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.rut_information = req.body.rut_information

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/profiler', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information = req.body.profiler_information

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/getProfiler', jsonParser, async function (req, res) {
  const query = `SELECT c.profiler_information FROM c WHERE c.accountIdentifier = '${req.body.cuenta}'`

  const querySpec = {
    query,
    parameters: [],
  }

  const { resources: items } = await onboardingContainer
    .items
    .query(querySpec, options)
    .fetchAll()

  res.send(items[0])
})
app.post('/perfil-question1', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information.question1 =
    req.body.profiler_information.question1

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/perfil-question2', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information.question2 =
    req.body.profiler_information.question2

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/perfil-question3', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information.question3 =
    req.body.profiler_information.question3

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/perfil-question4', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information.question4 =
    req.body.profiler_information.question4

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/perfil-question5', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information.question5 =
    req.body.profiler_information.question5

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/perfil-question6', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information.question6 =
    req.body.profiler_information.question6

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/perfil-question7', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information.question7 =
    req.body.profiler_information.question7

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/perfil-question8', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information.question8 =
    req.body.profiler_information.question8

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/perfil-question9', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information.question9 =
    req.body.profiler_information.question9

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/perfil-question10', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information.question10 =
    req.body.profiler_information.question10

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
})
app.post('/result-profiler', jsonParser, async function (req, res) {
  const element = await getElement(req.body.id)

  element.profiler_information.result = req.body.profiler_information.result

  try {
    await onboardingContainer.item(req.body.id).replace(element)

    res.send('Información actualizada')
  } catch (error) {
    res.send('Error al actualizar los datos' + error)
  }
});

const getElement = async (pid) => {
  const id = pid
  const query = `SELECT * FROM c WHERE c.id = '${id}'`

  const querySpec = {
    query,
    parameters: [],
  }

  const { resources: items } = await onboardingContainer
    .items
    .query(querySpec, options)
    .fetchAll()

  return items[0];
}

module.exports = {
  path: '/api/',
  handler: app,
}
