const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_ENDPOINT_KEY,
  databaseId: process.env.COSMOS_DATABASE_ID,
  complianceContainerId: process.env.COSMOS_COMPLIANCE_CONTAINER_ID,
  compliancePartitionKey: { kind: 'Hash', paths: ['/compliance_information'] },
  onboardingContainerId: process.env.COSMOS_ONBOARDING_CONTAINER_ID,
  onboardingPartitionKey: { kind: 'Hash', paths: ['/leads'] },
  legalContainerId: process.env.COSMOS_LEGAL_CONTAINER_ID,
  legalPartitionKey: { kind: 'Hash', paths: ['/legal_information'] },
}

module.exports = config
