import React from 'react';
import axios from 'axios';
import Styles from './../stylesheets/top_sales.scss';
import {transformData, calculateRevenue, getTopTen} from '../utils/transformData';
import { getSymbolFromCurrency } from 'currency-symbol-map'

console.log('Styles', Styles)

// export default TopSalesList;
//write top sales list component here
// class TopSalesList extends React.Component  {
//     render() {
//         return <div>TopSalesList Here</div>
//     }
// };

// export default TopSalesList;

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
        console.log('products', products)

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
          <div key={index} className={Styles["product-flex-container"]}>
            <div>
              <p className={Styles["bullet-order"]}>{index + 1}</p>
            </div>
            <div className={Styles["product-info-container"]}>
              <div className={Styles["name"]}>{product.name}</div>
              <div className={Styles["revenue"]}>{getSymbolFromCurrency(product.vendor_price.code)}{product_revenue}</div>
            </div>
          </div>
        )
      })

      return(
        <div className={Styles["container"]}>
          <header className={Styles["header-container"]}>
            <h1 className={Styles["header"]}>Top Sales Items</h1>
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

