import React, { useState, useEffect } from "react";
import store from "../store/index";
import { Button } from "antd";
import { getNextState } from "./../utils/index";
export default function ReduxPage() {
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const unSubscribe = store.subscribe(async () => {
      let preRefresh = await getNextState(setRefresh);
      setRefresh(preRefresh + 1);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const add = () => {
    // console.log('====================================');
    // console.log(store.dispatch);
    // console.log('====================================');
    store.dispatch({ type: "ADD", payload: 100 });
  };
  const asyncAdd = () => {
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({type: 'ADD'})
      }, 1000);
    })
  }
  const promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        type: 'MINUS'
      })
    )
  }
  return (
    <div>
      <h1>ReduxPage</h1>
      <Button onClick={add}>add</Button>
      <Button
        onClick={asyncAdd}
      >
        asyncAdd
      </Button>
      <Button onClick={promiseMinus}>promise</Button>
      <p>{store.getState().counter}</p>
    </div>
  );
}
