import { useState } from 'react';
import classes from './App.module.css';

import { Opportunities } from '@/page';
import { Fake } from '@/component';
function App() {
  const [id, setId] = useState(0);
  return (
    <div className={classes.root}>
      <h1 className={classes.h1}>Empathy</h1>
      <Opportunities id={id} />
      <Fake id={id} onClick={(id) => setId(id)} />
    </div>
  );
}

export default App;
