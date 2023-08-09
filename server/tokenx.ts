import { Issuer } from 'openid-client';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import nodeJose from 'node-jose';
import logger from './logger';
import { ApplicationName } from './tokenProxy';
import { miljø } from './miljø';

class TokenXClient {
  private tokenxClient: any = null;
  private audience: any = null;

  constructor() {
    logger.info('Setter opp TokenX');

    this.init()
      .then((client: any) => {
        this.tokenxClient = client;
      })
      .catch(() => process.exit(1));
  }

  exchangeToken = async (
    idportenToken: any,
    applicationName: ApplicationName
  ) => {
    const clientAssertion = await this.createClientAssertion();

    return this.tokenxClient
      .grant({
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        client_assertion_type:
          'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        token_endpoint_auth_method: 'private_key_jwt',
        client_assertion: clientAssertion,
        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
        subject_token: idportenToken,
        audience: `${tokenxConfig.clusterName}:teamfamilie:${applicationName}`,
      })
      .then((tokenSet: any) => {
        return Promise.resolve(tokenSet.access_token);
      })
      .catch((err: any) => {
        logger.error('Feil under utveksling av token: ', err);
        return Promise.reject(err);
      });
  };

  private createClientAssertion = async () => {
    const now = Math.floor(Date.now() / 1000);

    const payload = {
      sub: tokenxConfig.clientId,
      iss: tokenxConfig.clientId,
      aud: this.audience,
      jti: uuid(),
      nbf: now,
      iat: now,
      exp: now + 60, // max 120
    };

    const key = await this.asKey(tokenxConfig.privateJwk);

    const options: any = {
      algorithm: 'RS256',
      header: {
        kid: key.kid,
        typ: 'JWT',
        alg: 'RS256',
      },
    };

    return jwt.sign(payload, key.toPEM(true), options);
  };

  private asKey = async (jwk: any) => {
    if (!jwk) {
      logger.error('JWK Mangler');
      throw Error('JWK Mangler');
    }

    return nodeJose.JWK.asKey(jwk).then((key: any) => {
      return Promise.resolve(key);
    });
  };

  private init = async () => {
    if (!tokenxConfig.discoveryUrl) {
      logger.error('Mangler miljøvariabel TOKEN_X_WELL_KNOWN_URL');
      throw new TypeError(
        'Miljøvariabelen "TOKEN_X_WELL_KNOWN_URL må være satt'
      );
    }
    const tokenx = await Issuer.discover(tokenxConfig.discoveryUrl);
    this.audience = tokenx.token_endpoint;

    logger.info(`Discovered TokenX @ ${tokenx.issuer}`);

    try {
      const client = new tokenx.Client({
        client_id: tokenxConfig.clientId as string,
        redirect_uris: [tokenxConfig.redirectUri],
        token_endpoint_auth_method: 'none',
      });

      logger.info('Opprettet TokenX client');

      return Promise.resolve(client);
    } catch (err) {
      logger.error(
        'Feil oppstod under parsing av jwt eller opprettelse av TokenX client',
        err
      );
      return Promise.reject(err);
    }
  };
}

const tokenxConfigMiljø = {
  discoveryUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
  clientId: process.env.TOKEN_X_CLIENT_ID,
  privateJwk: process.env.TOKEN_X_PRIVATE_JWK,
  redirectUri: miljø.oauthCallbackUri,
  clusterName: process.env.NAIS_CLUSTER_NAME,
};

const tokenxConfig = {
  discoveryUrl:
    'https://tokendings.dev-gcp.nais.io/.well-known/oauth-authorization-server',
  clientId: 'dev-gcp:teamfamilie:familie-ef-soknad',
  privateJwk:
    '{"use":"sig","kty":"RSA","kid":"3141a919-f151-45e9-8a40-710c7b5b4500","n":"t6VkaMdRFW-ChmGpuUIW6rYFC2ifoJuJx2MYk49wPXl7wls2T0k6lkaBcyd3GddS7uhE-RcfzqMn_4PcZfZ7VqM5LFG6SDse3lngN90Pi_PGr_O9oc3Im_6k9rfJmjy0RzyWvrvBCuTzlOA0g1D1E7LV3Cb_6y_Hxq_tsZsypLA-lX9P8GCKHNAS6ibHSroI05SFwnEyncPrJ9BHgm3Iq-FoQhUU1sP_vWfw6aHIdhvNP5eo_N7eiOVamptTw58PiSVj40v6zU6RYleWQf48taGLgkUAjgJdacC_HkAF4JSb753yx432c1Ilawzw963J-aGBix8GS30hhZ_ElqnCvw","e":"AQAB","d":"FTto_Xg11q2awKCf98w9TAuZT7Vb5zy0VDoPyFeoGWNnPJRBFi-YN3GVW9PvQCyV6QsvlkDnK4PPhwoevCcgIWcjoA0e5WT4b6qicrL7LioUCZm7je51yBtLxT6Ab3WfPjEyGIEqk3De_JJjX99HRmzBrv9PTUir5zvF1mfkFggcIlJumnUExmSQLO4WctQvivZiyMAMrnvy4paEIhnZxmr1mN3iLqjbtHLYDnhHU5V-9bkfLYxd5oZ340rYID-RB71Zw0XdW0QUpwEiabuO_rAP54--Jy4XrtWLpe99WqknBXSN5dhmEIhCwpx69FFVv1jYasRDeq5cfhwy5Y8cwQ","p":"6GMG8fGv27tT8YFBacc_rURkDm1XT7QydtIpFCUZZXOtAYrVJijSFupIZf4B8sYLgk11vtt7b5xxUeyOY4y3gxsQt74kdKZ95Gveul8sVD1Ygo-qcCJwZN0XeUp-DQSqWshIt3U-onYGVkU3DVrJAIOEWse8PHM0YpKgfp3gkKE","q":"yk5-at8Lhm5p5oDXd1zwoalGXkrEoOjNt40vO_44pzBXZ0vK5PbjeGgjAW7Fpg2xIbgNAQx9bwdVtqeJ7yFTSL7RSQdEFgsyY4q7-oBEDEZyxmasEz50_Js3KNseVaGvEkVzdWu1D-l8fE7GzR4vSK2a4Pk38F0AtRFQZPZRt18","dp":"EXE1WT2RvIVf9JWGCmF5JxEmDWspjYLx8rctfCSYtmOrTZ1VCEsyEaQ-EOGy1b0Fqh8UQmII7sSoQMTnnxM1xvJmG9R6ugKxGk76ZbS1CBGerhYIbeg31Wo-08zCj0mVW8ECrDpxnBINwbXqPudchNxaN9IcD9F50hg9UaOZ8mE","dq":"lzitTn2DQ-1sw5wzc0nJpU2_B-SjrhPXEgk68YFKH88GxnPlKdlSl0JgSEXhAArkCOxm7A3GBSRacboyZMloU8wu7IO95Sxhcf7WHJ2cQAC48oz0uz3IfLoZNTT1K9U75FB9yZvFMCu7nb_U4qZZed4rE1e29LjQOojCq3VkB8k","qi":"mTP2b-EJrvqOlaiteXeQetUq1_ZzeqkGDrlxlTvW-GkhRP5sfHW2UdAxUGXCBj8xGT8Ct0zdIkmaoyk-h4k0s2SuGKQnDykUWUmW-uoKpjC97ivL6cjlu2M2D47Ny88Z6gtxdn2GvKPn1cZRE3nS-ACOiUQUVSO7JhX7AlUAJuM"}',
  redirectUri: miljø.oauthCallbackUri,
  clusterName: 'dev-gcp',
};

// const tokenxConfig = tokenxConfigLOKAL;

export default TokenXClient;
