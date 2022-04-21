import React from "react";

const StoreWrapper = React.createContext();

export function Provider({ store, ...props }) {
  // how do we update the states?
  const [currState, setState] = React.useState(store.getState());
  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return unsubscribe;
  }, [currState]);

  const {} = React.useMemo(() => {
    return {state: store.getState(), subscribe: }
  })

  return (
    <StoreWrapper.Provider
      value={{ state: currState, dispatch: store.dispatch }}
    >
      {props.children}
    </StoreWrapper.Provider>
  );
}

export function useSelector(selector) {
  // how can we access the state in store?
  const context = React.useContext(StoreWrapper);
  return selector(context.state);
}

export function useDispatch() {
  const { dispatch } = React.useContext(StoreWrapper);
  return dispatch;
}
