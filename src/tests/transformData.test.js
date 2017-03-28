import {aggregateData, deDupProductsData, calculateRevenue, sortProductsData, transformData} from './../utils/transformData.js'

const mock_order_data =[
  {
    purchase_order_id: '001',
    vendor_name: 'Vendor Pho',
    store_name: 'Awesome Pho',
    products: [
      {
        name: 'product A',
        product_id: "101",
        order_count: 12,
        vendor_price: {
          code: "USD",
          value: 1504,
          scale: 2
        }
      },
      {
        name: 'product B',
        order_count: 20,
        product_id: "102",
        vendor_price: {
          code: "USD",
          value: 809,
          scale: 4
        }
      },
      {
        name: 'product C',
        order_count: 1000,
        product_id: "103",
        vendor_price: {
          code: "USD",
          value: 109,
          scale: 10
        }
      }
    ]
  },
 {
    purchase_order_id: '002',
    vendor_name: 'Vendor Pie',
    store_name: 'Delicious Pie',
    products: [
      {
        name: 'product D',
        order_count: 12,
        product_id: "104",
        vendor_price: {
          code: "USD",
          value: 1989,
          scale: 3
        }
      },
      {
        name: 'product E',
        order_count: 20,
        product_id: "105",
        vendor_price: {
          code: "USD",
          value: 209,
          scale: 15
        }
      },
      {
        name: 'product F',
        order_count: 190,
        product_id: "106",
        vendor_price: {
          code: "USD",
          value: 509,
          scale: 20
        }
      }
    ]
  }
]

let mock_product_data = [
  {
    name: 'product A',
    product_id: "101",
    order_count: 12,
    vendor_price: {
      code: "USD",
      value: 1504,
      scale: 2
    }
  },
  {
    name: 'product B',
    order_count: 20,
    product_id: "102",
    vendor_price: {
      code: "USD",
      value: 809,
      scale: 4
    }
  },
  {
    name: 'product K',
    order_count: 380,
    product_id: "110",
    vendor_price: {
      code: "USD",
      value: 1009,
      scale: 20
    }
  },
  {
    name: 'product T',
    order_count: 380,
    product_id: "111",
    vendor_price: {
      code: "USD",
      value: 1009,
      scale: 20
    }
  },
  {
    name: 'product F',
    order_count: 190,
    product_id: "106",
    vendor_price: {
      code: "USD",
      value: 509,
      scale: 20
    }
  },
  {
    name: 'product F',
    order_count: 190,
    product_id: "106",
    vendor_price: {
      code: "USD",
      value: 509,
      scale: 20
    }
  }
]


describe('aggregateData', () => {
  it('Should throw error if passed in nothing', () => {
    expect( () => {
      aggregateData()
    }).toThrow(Error('Invalid: Purchase Data Input'))
  })

  it('Should return empty array if passed in empty array', () => {
    expect(aggregateData([])).toEqual([])
  })

  it('Should return array of aggregated products', () => {
    let aggregated_data = aggregateData(mock_order_data)

    expect(aggregated_data.length).toEqual(6)
    expect(aggregated_data[0].name).toEqual('product A')
    expect(aggregated_data[1].name).toEqual('product B')
    expect(aggregated_data[2].name).toEqual('product C')
  })
})

describe('deDupProductsData', () => {
  it('Should throw error if passed in nothing', () => {
    expect( () => {
      deDupProductsData()
    }).toThrow(Error('Invalid: Product Data Input'))
  })

  it('Should return empty array if passed in empty array', () => {
    expect(deDupProductsData([])).toEqual([])
  })

  it('Should return array of products without duplicates', () => {
    let products_data = deDupProductsData(mock_product_data)

    expect(products_data.length).toEqual(5)
    expect(products_data[0].name).toEqual('product A')
    expect(products_data[1].name).toEqual('product B')
    expect(products_data[2].name).toEqual('product F')
  })
})

describe('calculateRevenue', () => {
  it('Should throw error if passed in nothing', () => {
    expect( () => {
      calculateRevenue()
    }).toThrow(Error('Invalid: Order Count'))
  })

  it('Should throw error if passed in only order_count', () => {
    expect( () => {
      calculateRevenue(2)
    }).toThrow(Error('Invalid: Value'))
  })

  it('Should throw error if did not pass in scale', () => {
    expect( () => {
      calculateRevenue(2, 14)
    }).toThrow(Error('Invalid: Scale Value'))
  })

  it('Should return the right revenue value', () => {
    expect(calculateRevenue(100, 1503, 100)).toEqual(1503.00)
    expect(calculateRevenue(80, 1503, 100)).toEqual(1202.4)
    expect(calculateRevenue(35, 12033, 1000)).toEqual(421.15)

  })
})

describe('sortProductsData', () => {
  it('Should throw error if passed in nothing', () => {
    expect( () => {
      sortProductsData()
    }).toThrow(Error('Invalid: Product Data Input'))
  })

  it('Should return empty array if passed in empty array', () => {
    expect(sortProductsData([])).toEqual([])
  })

  it('Should sort the product data in order of count and revenue', () => {
    expect(sortProductsData(mock_product_data).length).toBe(6)
    expect(sortProductsData(mock_product_data)[0].product_id).toBe("110")
    expect(sortProductsData(mock_product_data)[1].product_id).toBe("111")
    expect(sortProductsData(mock_product_data)[2].product_id).toBe("106")
    expect(sortProductsData(mock_product_data)[3].product_id).toBe("106")
    expect(sortProductsData(mock_product_data)[4].product_id).toBe("102")
    expect(sortProductsData(mock_product_data)[5].product_id).toBe("101")
  })
})

describe('transformData', () => {
  it('Should throw error if passed in nothing', () => {
    expect( () => {
      transformData()
    }).toThrow(Error('Invalid: Purchase Order Input'))
  })

  it('Should return empty array if passed in empty array', () => {
    expect(transformData([])).toEqual([])
  })

  it('Should return array of sorted products without duplicates', () => {
    let sorted_and_dedup_products_data = transformData(mock_order_data)

    expect(sorted_and_dedup_products_data.length).toEqual(6)
    expect(sorted_and_dedup_products_data[0].product_id).toEqual("103")
    expect(sorted_and_dedup_products_data[1].product_id).toEqual("106")
    expect(sorted_and_dedup_products_data[2].product_id).toEqual("102")
    expect(sorted_and_dedup_products_data[3].product_id).toEqual("105")
    expect(sorted_and_dedup_products_data[4].product_id).toEqual("101")
    expect(sorted_and_dedup_products_data[5].product_id).toEqual("104")
  })
})

