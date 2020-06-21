// A old style for javascript to dealing with indefinite length of arguments.
// The actual arguments are formed as an array-like object and assigned to
// `arguments` property of called function object (see second line) and the
// property can be accessed via `arguments` identifier in the body of function.

function func() {
  console.log(arguments);
  console.log(func.arguments);
}

func(1, 2, 3);
