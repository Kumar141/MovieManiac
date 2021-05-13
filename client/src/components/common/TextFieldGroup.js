import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function TextFieldGroup(props) {
  return (
    <div>
      <input
        name={props.name}
        type={props.type}
        id={props.id}
        className={classnames("form-control gap", {
          "is-invalid": props.fieldErrors,
        })}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        // autoFocus
      />
      {props.info && (
        <small className="from-text text-muted">{props.info}</small>
      )}
      {props.fieldErrors && (
        <div className="invalid-feedback">{props.fieldErrors}</div>
      )}
    </div>
  );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextFieldGroup.defaultProps = {
  type: "text",
};

export default TextFieldGroup;
