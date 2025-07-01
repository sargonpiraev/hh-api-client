export default {
  input: './headhunter-api-spec.yaml',
  output: './src/generated',
  client: '@hey-api/client-axios',
  types: {
    enums: 'javascript'
  }
};
