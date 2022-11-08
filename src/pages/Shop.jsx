import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Categories, Collection, TitleBread, Pagination } from "../components";
import { fetchProducts } from "../redux/actions/products";

function Shop({ handleProduct, handleShopCat, categorySelected }) {
  const [currentPage, setCurrentPage] = React.useState(1);

  const items = useSelector(({ products }) => products.items);
  const dispatch = useDispatch();

  let PageSize = 9;

  const currentProducts = () => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return items.slice(firstPageIndex, lastPageIndex);
  };

  React.useLayoutEffect(() => {
    if (categorySelected) {
      dispatch(fetchProducts(categorySelected));
    } else {
      dispatch(fetchProducts(null));
    }
    currentProducts();
  }, [categorySelected]);

  return (
    <div id="shop">
      <div className="container centered column">
        <TitleBread title="Shop" />
        <Categories
          selectCategory={handleShopCat}
          activeCategory={categorySelected}
        />
        <div className="counter text-block">
          <p>Showing on page: {currentProducts().length} products</p>
        </div>
        <Collection
          products={currentProducts()}
          useNavigation
          handleProduct={handleProduct}
        />
        <div className="counter text-block">
          <p>Showing on page: {currentProducts().length} products</p>
        </div>
        <Pagination
          currentPage={currentPage}
          totalCount={items.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default Shop;
