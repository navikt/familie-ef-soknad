export interface IRoute {
  label: string;
  path: string;
}
export const Routes: IRoute[] = [
  { path: '/', label: 'Forside' },
  { path: '/om-deg', label: 'Om deg' },
  { path: '/bosituasjon', label: 'Bosituasjonen din' },
  { path: '/barn', label: 'Barn' },
  {
    path: '/barnas-bosted',
    label: 'Barnas bosted og foreldrenes samværsordning',
  },
  { path: '/send-soknad', label: 'Send søknad' },
];
