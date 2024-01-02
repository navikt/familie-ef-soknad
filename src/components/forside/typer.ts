import { IPerson } from '../../models/søknad/person';

export interface InformasjonProps {
  person: IPerson;
  harBekreftet: boolean;
  settBekreftelse: (bekreftet: boolean) => void;
}
