import React from "react";

function RecipeList(props) {
  console.log(props);
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Ingredients</th>
          <th>Method</th>
        </tr>
      </thead>
      <tbody>
        {props.smiya.map((e, i) => {
          return (
            <>
              <tr>
                <td>{e.id}</td>
                <td>{e.Ingredients}</td>
                <td>{e.Method}</td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}

export default RecipeList;
