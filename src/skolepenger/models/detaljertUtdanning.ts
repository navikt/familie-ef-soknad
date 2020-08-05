import { IUnderUtdanning } from '../../models/steg/aktivitet/utdanning';
import { ITekstFelt } from '../../models/søknadsfelter';

export interface IDetaljertUtdanning extends IUnderUtdanning {
  semesteravgift?: ITekstFelt;
  studieavgift?: ITekstFelt;
  eksamensgebyr?: ITekstFelt;
}
