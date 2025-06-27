import { defineConfig, defaultPlugins } from '@hey-api/openapi-ts'

export default defineConfig({
  input: './headhunter-api-spec.yaml',
  output: './src/generated',
  plugins: [
    ...defaultPlugins,
    {
      name: '@hey-api/sdk',
    },
  ],
})
