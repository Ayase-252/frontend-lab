import init, {greet} from '../simple-add/pkg/simple_add'

init().then(() => {
  greet("WebAssembly")
})
