import React from 'react';
import PropTypes from 'prop-types';

/**
 * Display an individual bio in table form.
 *
 * @param {string} name
 *   Full name of bio
 * @param nodeId
 *   Drupal node.nid of the article.
 * @param {function} updateItem
 *   function to update status field and move item to another list
 *
 */
function ListItem(props) {
  const {
    name,
    nodeId,
    updateItem,
    drupalId,
  } = props;

  return (
    <tr>
      <td>
        <a href={`/node/${nodeId}`}>{name}</a>
      </td>
      <td>
        <button type="button" onClick={() => { updateItem(drupalId); }}>Add Next</button>
        {/*   updateItem={this.updateTask}  */}
      </td>
      {/* <td>
        <a href={`/node/{$props.nodeId}/edit`}>Edit</a>
      </td> */}
    </tr>
  );
}

/**
 * Define propTypes per Airbnb ESLint rules:
 * https://github.com/airbnb/javascript/tree/master/react#props
 */
ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  nodeId: PropTypes.number.isRequired,
  drupalId: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
};

export default ListItem;
