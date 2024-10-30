import React from 'react';

function Pricebook2Nav() {
  return (
    <nav style={{marginLeft: '1em', position: 'sticky', top: '2em', marginTop: '8em'}}>
        <h5>In this page:</h5>
        <ul>
            <li><a class="appearance-none" href="#enrolledSkusArticle">Enrolled Skus List</a></li>
            <li><a class="appearance-none" href="#productsUpdateArticle">Sku Update File</a></li>
            <li><a class="appearance-none" href="#priceHistoriesArticle">Price Histories</a></li>
        </ul>
    </nav>
  );
}

export default Pricebook2Nav;
