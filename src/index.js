import dva, { connect } from 'dva';
import { Router, Route, Switch } from 'dva/router';
import fetch from 'dva/fetch';
import React from 'react';
import styles from './index.less';

// 1. Initialize
const app = dva();

// 2. Model
// Remove the comment and define your model.
app.model({
  namespace : 'count2',
  state : {
    current : 0,
    record : 0
  },
  reducers : {
    add(state){
      console.log(state)
     let nowCount = state.current + 1;
     return {...state, current : nowCount, record : nowCount > state.record ? nowCount : state.record };
    }
  }
});

// 3. Router
const CountApp = ({count, dispatch}) => {
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.current}>{count.current}</div>
      <div className={styles.button}>
        <button onClick={() => { dispatch({type: 'count2/add'}); }}>+</button>
      </div>
    </div>
  );
};

//对应全局的data store， count2 是其namespace，用于分离
function mapStateToProps(state) {
  console.log(state)
  return { count: state.count2 };
}
const HomePage = connect(mapStateToProps)(CountApp);

// const HomePage = () => <div>Hello Dva.</div>;

app.router(({ history }) =>
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={HomePage} />
    </Switch>
  </Router>
);

// 4. Start
app.start('#root');
