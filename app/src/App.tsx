import React, { ReactElement } from 'react';

import Quiz from './quiz';

function App(): ReactElement {
  // const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  // const [error, setError]: [string, (error: string) => void] = React.useState('');

  return <Quiz></Quiz>;
}

export default App;