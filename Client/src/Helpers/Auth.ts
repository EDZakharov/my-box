// import { workspace } from '../redux/api'
// import { store } from '../redux/store'

class Authentication {
  async root() {
    // await store.dispatch(workspace.endpoints.refresh.initiate({}))
    // workspace.endpoints.refresh.select({})(store.getState())
  }
}

export const Auth = new Authentication()
