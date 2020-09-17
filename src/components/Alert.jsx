import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Notify = styled.div`
  position: relative;
  padding: .75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: .25rem;

  &.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
`;

/**
 * Display an alert.
 *
 * @param {string} message
 *   message to display
 * @param {string} type
 *   alert type, for css styling
 *
 */
function Alert(props) {
  const {
    message,
    type,
  } = props;

  return (
    <Notify className={`alert-${type}`} role="alert">
      {message}
    </Notify>
  );
}

/**
 * Define propTypes per Airbnb ESLint rules:
 * https://github.com/airbnb/javascript/tree/master/react#props
 */
Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Alert;
