//feel free to use lodash; it provides alot of type methods that are native to other languages
//import {function} from 'lodash';

//transform data if needed here
//

/**
 * @param {Array.<Object>}
 * @return {Array.<Object>}
 */
// export function transformData(data) {
//     return data;
// };

/**
 * @param {Array.<Object>}: the array of purchase order object
 * @return {Array.<Object>}: the array of product object for all purchase order
 *
 */
export function aggregateData(data) {
  if (!data) {
    throw Error("Invalid: Purchase Data Input");
  }

  if (data.length === 0) {
    return [];
  }

  let products = data.map(purchase_order => {
    return purchase_order.products;
  });

  return products.reduce((prev, curr) => {
    return prev.concat(curr);
  });
}

/**
 * @param {Array.<Object>}: the array of products object with duplicates
 * @return {Array.<Object>}: the array of products object without duplicates
 *
 */
export function deDupProductsData(data) {
  if (!data) {
    throw Error("Invalid: Product Data Input");
  }

  if (data.length === 0) {
    return [];
  }

  let hash = {};

  data.forEach((product, index) => {
    let product_id = product.product_id;
    if (!hash[product_id]) {
      hash[product_id] = product;
    }
  });

  return Object.keys(hash).map(k => {
    return hash[k];
  });
}

/**
 * @param {Array.<Object>}: the array of unsorted products object
 * @return {Array.<Object>}: the array of sorted products object without duplicates
 *
 */
export function sortProductsData(data) {
  if (!data) {
    throw Error("Invalid: Product Data Input");
  }

  if (data.length === 0) {
    return [];
  }
  var result = data.slice(0);

  result.sort((productA, productB) => {
    let productA_order_count = productA.order_count;
    let productA_value = productA.vendor_price.value;
    let productA_scale = productA.vendor_price.scale;
    let productA_revenue = calculateRevenue(
      productA_order_count,
      productA_value,
      productA_scale
    );

    let productB_order_count = productB.order_count;
    let productB_value = productB.vendor_price.value;
    let productB_scale = productB.vendor_price.scale;
    let productB_revenue = calculateRevenue(
      productB_order_count,
      productB_value,
      productB_scale
    );

    if (productA_order_count === productB_order_count) {
      return productB_revenue - productA_revenue;
    }

    return productB_order_count - productA_order_count;
  });

  return result;
}

/**
 * @param {Number}: number of order for a particular product
 * @param {Number}: the retail value for a particular product
 * @return {Number}: the scale for a particular product
 *
 */
export function calculateRevenue(order_count, value, scale) {
  if (!order_count) {
    throw Error("Invalid: Order Count");
  }

  if (!value) {
    throw Error("Invalid: Value");
  }

  if (!scale) {
    throw Error("Invalid: Scale Value");
  }

  return parseFloat((order_count * (value / scale)).toFixed(2));
}

/**
 * @param {Array.<Object>}: the array of purchase order object
 * @return {Array.<Object>}: the array of sorted products object without duplicates
 *
 */
export function transformData(data) {
  if (!data) {
    throw Error("Invalid: Purchase Order Input");
  }

  if (data.length === 0) {
    return [];
  }

  return sortProductsData(
    deDupProductsData(
      aggregateData(data)
    )
  );
}

/**
 * @param {Array.<Object>}: the array of purchase order object
 * @return {Array.<Object>}: the array of first 10 sorted products object without duplicates
 *
 */
export function getTopTen(data) {
  if (!data) {
    throw Error("Invalid: Product Data Input");
  }

  if (data.length === 0) {
    return [];
  }
  return data.slice(0,10)
}
