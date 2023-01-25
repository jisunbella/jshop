import './button.styles.scss';

/* 
3 BUTTON TYPES
1. default
2. inverted
3. google sign in button
*/

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>{children}</button>
  );
};

export default Button;