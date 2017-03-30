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
import ProductList from './product_list.component.js'

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
    if(this.state.data.length > 0){
      return(
        <div className={container}>
          <header className={header_container}>
            <h1 className={header}>Top Sales Items</h1>
          </header>
          <ProductList data={this.state.data} />
        </div>
      )
    }else{
      return <div>Data Not Available</div>
    }
  }
}

