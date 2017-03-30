import React from 'react';
import { calculateRevenue } from '../utils/transformData';
import { getSymbolFromCurrency } from 'currency-symbol-map'
import {
      product_flex_container,
      bullet_order,
      product_info_container,
      product_name,
      container,
      header,
      product_revenue,
      header_container
    }  from './../stylesheets/top_sales.scss';

export default function ProductList(props){
  let product_list = props.data.map( (product, index) => {
      const product_revenue = calculateRevenue(product.order_count, product.vendor_price.value, product.vendor_price.scale)
      return(
        <div key={index} className={product_flex_container}>
          <div>
            <p className={bullet_order}>{index + 1}</p>
          </div>
          <div className={product_info_container}>
            <div className={product_name}>{product.name}</div>
            <div className={product_revenue}>{getSymbolFromCurrency(product.vendor_price.code)}{product_revenue}</div>
          </div>
        </div>
      )
    })

  return (
    <div>
      {product_list}
    </div>
  )
}
