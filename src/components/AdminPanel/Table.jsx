import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TitleBread from "../TitleBread";

function TableBlock({
  categoryAdmin,
  removeOrderHandler,
  setCurrentProductId,
  setCategorySelect,
  removeProductHandler,
  setCurrentMessageId,
  removeMessageHandler,
}) {
  const products = useSelector(({ products }) => products.items);
  const messages = useSelector(({ contacts }) => contacts.messages);
  const orders = useSelector(({ orders }) => orders.ordersContainer);

  return (
    <>
      <TitleBread
        title={
          categoryAdmin === 1
            ? "Products table"
            : categoryAdmin === 2
            ? "Messages table"
            : "Products orders"
        }
      />
      {categoryAdmin !== 3 && (
        <div id="add-new-item">
          {categoryAdmin === 1 ? (
            <Link to="/admin/new_product">Add new product</Link>
          ) : (
            categoryAdmin === 2 && (
              <Link to="/admin/new_message">Add new message</Link>
            )
          )}
        </div>
      )}
      <Table striped bordered hover variant="white" responsive>
        <thead>
          <tr>
            <th>#</th>
            {categoryAdmin === 3 ? (
              <>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Country</th>
                <th>City</th>
                <th>Street</th>
                <th>House/Flat</th>
                <th>Flat/House number</th>
                <th>Actions</th>
              </>
            ) : categoryAdmin === 2 ? (
              <>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Actions</th>
              </>
            ) : (
              <>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {categoryAdmin === 3
            ? orders.map((item, id) => {
                return (
                  <tr key={`${item}__${id}`}>
                    <td>{id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.message}</td>
                    <td>{item.country}</td>
                    <td>{item.city}</td>
                    <td>{item.street}</td>
                    <td>{item.houseFlat}</td>
                    <td>{item.flatHouseNum}</td>
                    <td className="actions">
                      <span onClick={() => removeOrderHandler(item.id)}>
                        Remove
                      </span>
                    </td>
                  </tr>
                );
              })
            : categoryAdmin === 2
            ? messages.map((item, id) => {
                return (
                  <tr key={`${item}__${id}`}>
                    <td>{id}</td>
                    <td>{item.name}</td>
                    <td>
                      <span>{item.email}</span>
                    </td>
                    <td>
                      <span>{item.phone}</span>
                    </td>
                    <td>
                      <span>{item.message}</span>
                    </td>
                    <td className="actions">
                      <span
                        onClick={() => {
                          setCurrentMessageId(item.id);
                        }}
                      >
                        <Link
                          state={{ messageId: item.id }}
                          to={`/admin/message/${item.id
                            .toString()
                            .replace(/\s/g, "-")
                            .toLowerCase()}`}
                        >
                          Edit
                        </Link>
                      </span>{" "}
                      |{" "}
                      <span onClick={() => removeMessageHandler(item.id)}>
                        Remove
                      </span>
                    </td>
                  </tr>
                );
              })
            : products.map((item, id) => {
                return (
                  <tr key={`${item}__${id}`}>
                    <td>{id}</td>
                    <td>{item.name}</td>
                    <td className="category">
                      <span onClick={() => setCategorySelect(item.category)}>
                        {item.category}
                      </span>
                    </td>
                    <td>
                      {item.price.old
                        ? `Price: New: $${item.price.new} Old: $${item.price.old}`
                        : `Price: $${item.price}`}
                    </td>
                    <td className="actions">
                      <span
                        onClick={() => {
                          setCurrentProductId(item.id);
                        }}
                      >
                        <Link
                          state={{ productId: item.id }}
                          to={`/admin/product/${item.name
                            .replace(/\s/g, "-")
                            .toLowerCase()}`}
                        >
                          Edit
                        </Link>
                      </span>{" "}
                      |{" "}
                      <span onClick={() => removeProductHandler(item.id)}>
                        Remove
                      </span>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
    </>
  );
}

export default TableBlock;
