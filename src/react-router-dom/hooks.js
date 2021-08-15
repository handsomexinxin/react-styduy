import { useContext } from 'react';
import { Context } from './RouterContext';

export const useHistory = () => {
  return useContext(Context).history
}

export const useLocation = () => {
  return useContext(Context).location
}

export const useRouteMatch = () => {
  return useContext(Context).match
}

export const useParams = () => {
  const match = useRouteMatch()
  return match? match.params: {}
}