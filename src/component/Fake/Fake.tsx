import classes from './Fake.module.css';

interface FakeType {
  id: number;
  onClick: (id: number) => void;
}

export const BUTTONS = [
  {
    id: 0,
    label: 'Normal',
  },
  {
    id: 1,
    label: '4 Esquinas',
  },
  {
    id: 2,
    label: '2 muy separados',
  },
  {
    id: 1000,
    label: 'Erroneo',
  },
];
const Fake = ({ id, onClick }: FakeType) => {
  return (
    <div>
      <h3 className={classes.h3}>Fake tester</h3>
      <ul className={classes.ul}>
        {BUTTONS.map((button) => {
          return (
            <li className={classes.li} key={button.id}>
              <button
                className={classes.button}
                onClick={() => onClick(button.id)}
                disabled={id === button.id}
              >
                {button.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Fake;
