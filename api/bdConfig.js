// import cosmos configuration
const CosmosClient = require('@azure/cosmos').CosmosClient;
const config = require('./config');
// cosmos variables
const { endpoint, key, databaseId, onboardingContainerId, complianceContainerId, compliancePartitionKey, legalContainerId } = config;
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const onboardingContainer = database.container(onboardingContainerId);
const complianceContainer = database.container(complianceContainerId);
const legalContainer = database.container(legalContainerId);

module.exports = {
    client,
    databaseId,
    complianceContainer,
    complianceContainerId,
    compliancePartitionKey,
    onboardingContainer,
    onboardingContainerId,
    legalContainer,
    legalContainerId,
};
