import React from 'react';
import clsx from 'clsx';
import styles from './examples.module.css';
import MultipleExample from './components/multiple';
import { useHistory } from 'react-router';
import AllExample from './components/all';

export default function ExampleSelector({server, endpointIds, router}) {
   const history = useHistory();
    var url = window.location;
    var name = new URLSearchParams(url.search).get('name');
    const [example, setExample] = React.useState(name ?? 'routes');


    const renderExample = (name) => {
        switch(name) {
          case 'routes':
            return <AllExample
            server={server}
            router={router}
          />

          case 'multiple':
            return <MultipleExample
            server={server}
            router={router}
            endpointIds={endpointIds}
            />
        }
      }

    const set = (name) => {
      history.replace(`/examples?name=${name}`)
      setExample(name)
    }
  
    return (
        <>
      <nav className={clsx(styles.nav)}>
        <button onClick={() => set('routes')}>
          All Routes
        </button>
        <button onClick={() => set('multiple')}>
          Multiple Remote Endpoints
        </button>
        </nav>

        <header>
            {renderExample(example)}
        </header>
        </>
    );
  }
  