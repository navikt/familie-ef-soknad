export interface IRoute {
  label: string;
  path: string;
}
export const Routes: IRoute[] = [
  { path: '/', label: 'Forside' },
  { path: '/om-deg', label: 'Om deg' },
  { path: '/barn', label: 'Barn' },
  { path: '/send-soknad', label: 'Send søknad' },
];
