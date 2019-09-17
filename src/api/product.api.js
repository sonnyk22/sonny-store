// ===============================================================================
// Imported Features
import {
    handleResponse, handleError,
    CoreConstant, CoreLogger as logger } from '../core';

//*********************************************************
//*****                   Constants                   *****
//*********************************************************
const logPrefix = '[Product.Api]:',
      baseUrl = `${CoreConstant.ServiceBaseUrl}/api/product`;

//*********************************************************
//*****                 API Functions                 *****
//*********************************************************
export function getProducts(skip = 0, limit = 10) {
    const url = `${baseUrl}/${skip}/${limit}`;

    logger.debug(`${logPrefix} GetProducts(). Http GET Url: `, url);

    return fetch(url)
              .then(handleResponse)
              .catch(handleError);
}

export function getProductsByName(name) {
    const url = `${baseUrl}/${name}`;

    logger.debug(`${logPrefix} GetProductsByName(). Http GET Url: `, url);

    return fetch(url)
              .then(handleResponse)
              .catch(handleError);
}
