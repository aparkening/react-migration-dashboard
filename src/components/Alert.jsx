import React from 'react';
import PropTypes from 'prop-types';

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
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
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
