import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { useState, useEffect } from "react";
import { addProduct } from "../../api/add-product";
import "./admin-panel.scss";
import { useSelector } from "react-redux";
import { RootState } from '../../store';
import { deleteProductApi } from '../../api/delete-product-api';
import { updateProductApi } from '../../api/update-product-api'; 
import { productType } from '../../types/productType';
import { useSetProducts } from "../../hooks/use-set-products/use-set-products";

export const AdminPanel = () => {
  const [isOpenAddPanel, setIsOpenAddPanel] = useState(false);
  const [isOpenList, setIsOpenList] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const products = useSelector((state: RootState) => state.products.products);
  const { handleSetProducts } = useSetProducts();

  const [productDetails, setProductDetails] = useState<productType>({
    _id: '',
    title: "",
    imgUrl: "",
    type: "",
    category: "",
    price: '',
    description: "",
    specifications: {
      storage: "",
      battery: "",
      color: "",
    },
  });

  useEffect(() => {
    handleSetProducts();
  }, [handleSetProducts]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          price: parsedValue,
        }));
      }
      return;
    }

    // Проверяем, является ли поле характеристикой товара
    if (name in productDetails.specifications) {
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        specifications: {
          ...prevDetails.specifications,
          [name]: value,
        },
      }));
    } else {
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const addOrUpdateProduct = () => {
    if (isEditMode && editingProductId) {
      const updatedProductDetails = getUpdatedProductDetails(editingProductId);
      updateProductApi(editingProductId, updatedProductDetails).then(() => {
        handleSetProducts();
        resetForm();
      });
    } else {
      addProduct(productDetails).then(() => {
        handleSetProducts();
        resetForm();
      });
    }
  };

  const getUpdatedProductDetails = (productId: string) => {
    const originalProduct = products.find((product) => product._id === productId);

    if (!originalProduct) {
      return productDetails;
    }

    const updatedProductDetails: Partial<productType> = {};

    // Сравниваем поля и добавляем изменённые
    if (productDetails.title !== originalProduct.title) {
      updatedProductDetails.title = productDetails.title;
    }

    if (productDetails.imgUrl !== originalProduct.imgUrl) {
      updatedProductDetails.imgUrl = productDetails.imgUrl;
    }

    if (productDetails.type !== originalProduct.type) {
      updatedProductDetails.type = productDetails.type;
    }

    if (productDetails.category !== originalProduct.category) {
      updatedProductDetails.category = productDetails.category;
    }

    if (productDetails.price !== originalProduct.price) {
      updatedProductDetails.price = productDetails.price;
    }

    if (productDetails.description !== originalProduct.description) {
      updatedProductDetails.description = productDetails.description;
    }

    // Для спецификаций
    const updatedSpecifications: Partial<typeof productDetails.specifications> = {};

    if (productDetails.specifications.storage !== originalProduct.specifications.storage) {
      updatedSpecifications.storage = productDetails.specifications.storage;
    }

    if (productDetails.specifications.battery !== originalProduct.specifications.battery) {
      updatedSpecifications.battery = productDetails.specifications.battery;
    }

    if (productDetails.specifications.color !== originalProduct.specifications.color) {
      updatedSpecifications.color = productDetails.specifications.color;
    }

    if (Object.keys(updatedSpecifications).length > 0) {
      updatedProductDetails.specifications = updatedSpecifications;
    }

    return updatedProductDetails;
  };

  const editProduct = (product: productType) => {
    setIsOpenAddPanel(true);
    setIsEditMode(true);
    setEditingProductId(product._id || null);
    setProductDetails(product);
  };

  const removeProduct = (product: productType) => {
    if (product && product._id) {
      deleteProductApi(product._id).then(() => handleSetProducts());
    }
  };

  const resetForm = () => {
    setIsEditMode(false);
    setEditingProductId(null);
    setProductDetails({
      title: "",
      imgUrl: "",
      type: "",
      category: "",
      price: '',
      description: "",
      specifications: {
        storage: "",
        battery: "",
        color: "",
      },
    });
  };

  return (
    <>
      <Header />
      <div className="admin-panel">
        <h1>Админ-панель</h1>
        <h2>Функции</h2>
        <div className="admin-panel-buttons">
          <button onClick={() => setIsOpenAddPanel((prev) => !prev)}>
            {isEditMode ? "Редактировать товар" : "Добавить товар"}
          </button>
          <button onClick={() => setIsOpenList((prev) => !prev)}>
            Список товаров
          </button>
        </div>
        <div className="admin-panel-forms">
          {isOpenAddPanel && (
            <div className="admin-panel-add-form">
              <input
                name="title"
                placeholder="Наименование товара"
                value={productDetails.title}
                onChange={handleChange}
              />
              <input
                name="imgUrl"
                placeholder="Путь изображения"
                value={productDetails.imgUrl}
                onChange={handleChange}
              />
              <input
                name="type"
                placeholder="Тип товара"
                value={productDetails.type}
                onChange={handleChange}
              />
              <input
                name="category"
                placeholder="Категория товара"
                value={productDetails.category}
                onChange={handleChange}
              />
              <input
                name="price"
                placeholder="Цена товара"
                value={productDetails.price}
                onChange={handleChange}
              />
              <input
                name="description"
                placeholder="Описание товара"
                value={productDetails.description}
                onChange={handleChange}
              />
              <input
                name="storage"
                placeholder="Хранилище товара"
                value={productDetails.specifications.storage}
                onChange={handleChange}
              />
              <input
                name="battery"
                placeholder="Объём батареи товара"
                value={productDetails.specifications.battery}
                onChange={handleChange}
              />
              <input
                name="color"
                placeholder="Цвет товара"
                value={productDetails.specifications.color}
                onChange={handleChange}
              />
              <button onClick={addOrUpdateProduct}>
                {isEditMode ? "Обновить" : "Добавить"}
              </button>
              {isEditMode && <button onClick={resetForm}>Отмена</button>}
            </div>
          )}
          {isOpenList && (
            <div>
              <h3>Список товаров</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Наименование</th>
                      <th>Изображение</th>
                      <th>Тип</th>
                      <th>Категория</th>
                      <th>Цена</th>
                      <th>Описание</th>
                      <th>Хранилище</th>
                      <th>Объём батареи</th>
                      <th>Цвет</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: productType, index) => (
                      <tr key={index}>
                        <td>{product.title}</td>
                        <td>{product.imgUrl}</td>
                        <td>{product.type}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td>{product.description.slice(0, 300)}...</td>
                        <td>{product.specifications.storage}</td>
                        <td>{product.specifications.battery}</td>
                        <td>{product.specifications.color}</td>
                        <td className="td-func">
                          <img
                            src="/edit.png"
                            width="20"
                            className="edit-img"
                            onClick={() => editProduct(product)}
                          />
                          <img
                            src="/remove.png"
                            width={20}
                            onClick={() => removeProduct(product)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
