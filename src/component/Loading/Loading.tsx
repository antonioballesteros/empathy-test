import imageLoading from './resource/draw-spinner.gif';
import classes from './Loading.module.css';

const Loading = () => {
  return (
    <div className={classes.root}>
      <img src={imageLoading} alt='this is the loading' />
    </div>
  );
};

export default Loading;
