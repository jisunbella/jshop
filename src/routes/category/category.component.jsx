import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
  
import ProductCard from '../../components/product-card/product-card.component';
  
import { CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {
          // categoriesMap은 비동기로 가져오기 때문에 가져오는 시점이 맞지 않아서 products가 빈 값일 때 렌더링 되면 에러가 남. 그래서 &&로 null 체크 해준다
          products && products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </Fragment>
  )
};

export default Category;
