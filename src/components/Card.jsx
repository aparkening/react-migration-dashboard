import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Col = styled.article`
  flex: 1 1 30%;
  border: 1px solid grey;
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  & div {
    flex: 1;
    padding: 1em;
  }
  & div.field--name-body {
    flex: 2;
  }
  & h3 {
    margin-top: 0;
  }
`;

/**
 * Display an individual bio card.
 *
 * @param {string} name
 *   Full name of bio
 * @param {string} summary
 *   Summary body of bio
 * @param nodeId
 *   drupal_internal__nid of the bio
 * @param {function} updateItem
 *   Function to update status field and move item to another list. Requires drupalId
 * @param drupalId
 *   Data id of bio
 * @param headshotId
 *   Headshot object id for locating headshot data
 * @param headshotAlt
 *   Alt text for headshot. Requires headshotId
 * @param headshotFilename
 *   Headshot filename. Requires headshotId
 *
 */
function Card(props) {
  const {
    name,
    nodeId,
    updateItem,
    drupalId,
    summary,
    headshotAlt,
    headshotFilename,
  } = props;

  return (
    <Col>
      <div className="field field--name-field-headshot field--type-image field__item">
        <img src={`/sites/default/files/styles/thumbnail/public/headshots/${headshotFilename}`} alt={headshotAlt} className="image-style-medium" />
      </div>
      <div className="clearfix text-formatted field field--name-body field--type-text-with-summary field__item">
        <h3><a href={`/node/${nodeId}`}>{name}</a> <a href={`/node/${nodeId}/edit`}>(Edit)</a></h3>
        <p>{summary}</p>
        <button
          type="button"
          onClick={() => {
            updateItem(drupalId, 'inProgress', 'todo', 'To Do'); /* drupalId, oldListId, newListId, newMigrationStatus */
          }}
        >
          Move -&gt; To Do
        </button>
      </div>
    </Col>
  );
}

/**
 * Define propTypes per Airbnb ESLint rules:
 * https://github.com/airbnb/javascript/tree/master/react#props
 */
Card.propTypes = {
  name: PropTypes.string.isRequired,
  nodeId: PropTypes.number.isRequired,
  drupalId: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
  summary: PropTypes.string.isRequired,
  headshotAlt: PropTypes.string.isRequired,
  headshotFilename: PropTypes.string.isRequired,
};

export default Card;
