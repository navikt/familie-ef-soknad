const CracoLessPlugin = require('craco-less');
const norskeOrdMedÆØÅ = [
  'Søknad',
  'ISøknad',
  'søknad',
  'Språk',
  'SpråkContext',
  'SpråkProvider',
  'Språkvelger',
  'JaNeiSpørsmål',
  'ISpørsmål',
  'Spørsmål',
  'SpørsmålContext',
  'SpørsmålProvider',
  'MultiSvarSpørsmål',
  'Søknadsbegrunnelse',
];

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  eslint: {
    enable: true,
    mode: 'extends',
    configure: {
      extends: 'react-app',
      rules: {
        // Det er en bug i denne sjekken som automatisk feiler på ÆØÅ: https://github.com/yannickcr/eslint-plugin-react/issues/1654
        'react/jsx-pascal-case': [
          'warn',
          {
            allowAllCaps: true,
            ignore: norskeOrdMedÆØÅ,
          },
        ],
      },
    },
  },
};
