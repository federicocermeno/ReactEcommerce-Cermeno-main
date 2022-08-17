import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFetch } from "../../../helpers/getFetch";
import { ItemList } from "../ItemList/ItemList";
import Spinner from "../LoadingSpinner/Spinner";
import "./ItemListContainer.css";

const ItemListContainer = ({ greeting }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoriaId } = useParams();

  /* useEffect(() => {
        if (categoriaId) {
          getFetch()
          .then(respuesta => setProductos(respuesta.filter(prod => prod.categoria === categoriaId)))
          .finally(() => { setLoading(false) })
        } else {
          getFetch()
          .then(respuesta => setProductos(respuesta))
          .finally(() => { setLoading(false) })
        }

    },[categoriaId]) */

  /* useEffect(() => {
        const db= getFirestore()
        const queryCollection = collection(db, 'productos')
        getDocs(queryCollection)
        .then(resp => setProductos(resp.docs.map(product => ({id : product.id, ...product.data()}))))
        .finally(() => setLoading(false))
    }) */

  //filtrado de productos por categoria
  const getProductsFirestore = (categoriaId) => {
    const db = getFirestore();
    const queryCollection = collection(db, "productos");
    const queryFiltrada = categoriaId
      ? query(queryCollection, where("categoria", "==", categoriaId))
      : queryCollection;

    getDocs(queryFiltrada)
      .then((resp) =>
        setProductos(
          resp.docs.map((product) => ({ id: product.id, ...product.data() }))
        )
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getProductsFirestore(categoriaId);
  }, [categoriaId]);

  return (
    <>
      <p className="item-list__container">{greeting}</p>
      <section className="item-list__body">
        {loading ? <Spinner /> : <ItemList items={productos} />}
      </section>
      {/* <ItemCount stock={10} initial={1} onAdd={onAdd}/> */}
    </>
  );
};

export default ItemListContainer;
