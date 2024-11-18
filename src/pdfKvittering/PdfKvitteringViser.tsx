import React, { useState } from 'react';
import { Document, Page as PdfPage, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import '@navikt/ds-css';
import '@navikt/ds-css';
import { CloudDownIcon } from '@navikt/aksel-icons';
import { Box, Button, HStack, Page, VStack } from '@navikt/ds-react';
import { Standarder } from './components/Standarder';
import type { Standarder as TypeStandarder } from './components/Standarder';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export function PdfKvitteringViser() {
  const [pdfLenke] = useState<string | undefined>(undefined);
  const [antallSider, settAntallSider] = useState(0);
  const [sidetall, settSidetall] = useState(1);
  const [standarder] = useState<TypeStandarder | undefined>(undefined);

  return (
    <Page className="bg-blue-100">
      <>
        <HStack margin={'2'} gap={'10'}>
          <Box className="mr-8 overflow-auto w-fit max-w-[60%]">
            <Document
              file={pdfLenke}
              onLoadSuccess={({ numPages }) => settAntallSider(numPages)}
            >
              <PdfPage pageNumber={sidetall}></PdfPage>
            </Document>
          </Box>

          <VStack gap={'3'}>
            <HStack justify={'space-between'}>
              <VStack>
                <p>
                  Side {sidetall} av {antallSider}
                </p>

                <HStack gap={'4'}>
                  <Button
                    disabled={sidetall === 1}
                    onClick={() => settSidetall(sidetall - 1)}
                  >
                    Forrige
                  </Button>
                  f
                  <Button
                    disabled={sidetall === antallSider}
                    onClick={() => settSidetall(sidetall + 1)}
                  >
                    Neste
                  </Button>
                  <Button icon={<CloudDownIcon aria-hidden />}>
                    Last ned Pdf
                  </Button>
                </HStack>
              </VStack>
            </HStack>
            {standarder && <Standarder standarder={standarder} />}
          </VStack>
        </HStack>
      </>
    </Page>
  );
}
