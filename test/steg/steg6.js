import { NesteKnapp, RadioPanel } from '../utils';

const TestSteg6 = async (t) => {
  const dinsituasjon = await RadioPanel('Gjelder noe av dette deg?', 'Nei');
  await t.click(dinsituasjon);

  const sagtOppEllerRedusert = await RadioPanel(
    'Har du sagt opp jobben eller redusert arbeidstiden de siste 6 månedene?',
    'Nei'
  );
  await t.click(sagtOppEllerRedusert);

  const søkerBestemtMnd = await RadioPanel(
    'Søker du overgangsstønad fra en bestemt måned?',
    'Nei, Nav kan vurdere fra hvilken måned jeg har rett til stønad'
  );
  await t.click(søkerBestemtMnd);

  await t.click(await NesteKnapp());
};

export default TestSteg6;
