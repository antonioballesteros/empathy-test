import classes from './Error.module.css';

interface ErrorType {
  error: string | boolean;
}
const Error = ({ error }: ErrorType) => {
  if (!error) {
    return null;
  }

  return <div className={classes.root}>{error}</div>;
};

export default Error;
