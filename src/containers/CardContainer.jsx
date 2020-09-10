import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from '../components/Card';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function CardContainer(props) {
  const {
    title,
    bios,
    updateItem,
    included,
  } = props;

  /**
   * Helper function to validate data retrieved from JSON:API.
   */
  function isValidData(data) {
    if (data === null) {
      return false;
    }
    if (data === undefined ||
      data === null ||
      data.length === 0 ) {
      return false;
    }
    return true;
  }

  function displayListItems() {
    if (isValidData(bios)) {
      return bios.map(obj => {
        const file = included.find(head => head.id === obj.relationships.field_headshot.data.id).attributes.filename;
        return (
          <Card 
            key={obj.id} 
            summary={obj.attributes.body.summary}
            name={obj.attributes.title} 
            nodeId={obj.attributes.drupal_internal__nid}
            updateItem={updateItem} 
            drupalId={obj.id}
            headshotId={obj.relationships.field_headshot.data.id}
            headshotAlt={obj.relationships.field_headshot.data.meta.alt}
            headshotFilename={file}
          />
        );
      });
    }
    else {
      return <div>No data available.</div>
    } 
  }

  return (
    <div className="list">
      <h2>{title}</h2>
      <Row>
        {displayListItems()}
      </Row>
    </div>
  );
}

/**
 * Define propTypes per Airbnb ESLint rules:
 * https://github.com/airbnb/javascript/tree/master/react#props
 */
CardContainer.propTypes = {
  title: PropTypes.string.isRequired,
  bios: PropTypes.array.isRequired,
  updateItem: PropTypes.func.isRequired,
  included: PropTypes.array.isRequired,
};

export default CardContainer;