import Appbar from 'muicss/lib/react/appbar';
import Login from './login';

export default () => {
  const appBarHeight = 'mui--appbar-height mui--appbar-line-height';
  const styles = {
    padding: '5px'
  };

  return (
    <Appbar>
      <div className={appBarHeight} style={styles}>
        <Login loggedIn={false}/>
      </div>
    </Appbar>
  );
};
