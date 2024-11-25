import { useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import '@navikt/ds-css';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const axiosConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
};
export const hentPdfKvittering = async (): Promise<any> => {
  /*   ${Environment().apiProxyUrl} */
  const response = await axios.get(
    `https://familie.ekstern.dev.nav.no/familie/alene-med-barn/soknad/api/soknadskvittering/83def408-b60c-4492-9ef9-75bd06e098b3`,
    axiosConfig
  );
  console.log('Response: ', response);

  return response && response.data;
};

export function PdfKvitteringViser() {
  useEffect(() => {
    hentPdfKvittering().then((pdfKvittering) => {
      //settStandarder(person.standarder);
      console.log('Response: ', pdfKvittering);
    });
  }, []);

  return <div>Test</div>;
  // return (
  //   <Page className="bg-blue-100">
  //     {pdfLenke && (
  //       <>
  //         <HStack margin={'2'} gap={'10'}>
  //           <Box className="mr-8 overflow-auto w-fit max-w-[60%]">
  //             <Document
  //               file={pdfLenke}
  //               onLoadSuccess={({ numPages }) => settAntallSider(numPages)}
  //             >
  //               <PdfPage pageNumber={sidetall}></PdfPage>
  //             </Document>
  //           </Box>

  //           <VStack gap={'3'}>
  //             <HStack justify={'space-between'}>
  //               <VStack>
  //                 <p>
  //                   Side {sidetall} av {antallSider}
  //                 </p>

  //                 <HStack gap={'4'}>
  //                   <Button
  //                     disabled={sidetall === 1}
  //                     onClick={() => settSidetall(sidetall - 1)}
  //                   >
  //                     Forrige
  //                   </Button>
  //                   f
  //                   <Button
  //                     disabled={sidetall === antallSider}
  //                     onClick={() => settSidetall(sidetall + 1)}
  //                   >
  //                     Neste
  //                   </Button>
  //                   <Button icon={<CloudDownIcon aria-hidden />}>
  //                     Last ned Pdf
  //                   </Button>
  //                 </HStack>
  //               </VStack>
  //             </HStack>
  //             {/* {standarder && <Standarder standarder={standarder} />} */}
  //           </VStack>
  //         </HStack>
  //       </>
  //     )}
  //   </Page>
  // );
}
