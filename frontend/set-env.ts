
import { writeFileSync } from 'fs';
import { mkdirSync } from 'fs';
import { join } from 'path';

const targetPath = join(__dirname, './src/environments/environment.ts');

const apiUrl = process.env['API_URL'] || 'http://localhost:3000';

const environmentFileContent = `
export const environment = {
  currentEnvironment: "development",
  apiUrl: '${apiUrl}'
};
`;

mkdirSync(join(__dirname, './src/environments'), { recursive: true });
writeFileSync(targetPath, environmentFileContent);

console.log(`✅ environment.ts gerado com sucesso em: ${targetPath}`);
