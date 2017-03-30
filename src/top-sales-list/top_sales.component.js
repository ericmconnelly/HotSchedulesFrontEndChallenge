import React from 'react';
import axios from 'axios';
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
import {transformData, calculateRevenue, getTopTen} from '../utils/transformData';
import { getSymbolFromCurrency } from 'currency-symbol-map'

export default class TopSalesList extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/PurchaseOrders')
      .then( (response) => {
        const data = response.data

        let products = getTopTen(transformData(data))

        this.setState({
          data: products
        });
      })
      .catch(error => {
        throw Error(error)
      });
  }

  render(){
    let top_ten_product_element

    if(this.state.data){
      top_ten_product_element = this.state.data.map( (product, index) => {

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

      return(
        <div className={container}>
          <header className={header_container}>
            <h1 className={header}>Top Sales Items</h1>
          </header>
          <div>
              {top_ten_product_element}
          </div>
        </div>
      )
    }else{
      return <div>Data Not Available</div>
    }


  }
}

