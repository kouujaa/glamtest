import { fetch } from '../../utils'

const HOSTNAME = process.env.REACT_APP_MYAPP_API_HOSTNAME

export const fetch<%= duckName %> = () => {
  return fetch(`${HOSTNAME}/<%= duckName %>`)
    .then((res) => res.json())
    .then((payload) => payload)
}
