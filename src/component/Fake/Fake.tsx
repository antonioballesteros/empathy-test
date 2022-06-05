import classes from './Fake.module.css';

interface FakeType {
  id: number;
  onClick: (id: number) => void;
}

const BUTTONS = 3;
const Fake = ({ id, onClick }: FakeType) => {
  return (
    <div>
      <h3 className={classes.h3}>Fake tester</h3>
      <ul className={classes.ul}>
        {[...Array(BUTTONS).keys()].map((item) => {
          return (
            <li className={classes.li} key={item}>
              <button
                className={classes.button}
                onClick={() => onClick(item)}
                disabled={id === item}
              >
                Test {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Fake;
