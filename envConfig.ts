import nextenv from '@next/env'
const { loadEnvConfig } = nextenv
 
const projectDir = process.cwd();
loadEnvConfig(projectDir)