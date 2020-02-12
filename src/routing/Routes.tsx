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
    path: '/arbeid-utdanning-og-andre-aktiviteter',
    label: 'Arbeid, utdanning og andre aktiviteter',
  },
  { path: '/send-soknad', label: 'Send søknad' },
];
