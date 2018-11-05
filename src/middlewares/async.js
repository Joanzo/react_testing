export default ({ dispatch }) => next => action => {
  // check to see if the 'promise' has a payload property
  // if it does, then wait for it to resolve
  // if it doesn't send to the next middleware
  // debugger;
  // !action.payload.then check if it is a promise
  if(!action.payload || !action.payload.then) {
    return next(action);
  }

  // we want to wait for the promise to resolve
  // (get its data !!) and then create a new action
  // with that data and dispatch it
  action.payload.then(function(response) {
    const newAction = { ...action , payload: response }
    dispatch(newAction);
  });
};