import { User } from './user.model';

export interface Authentication {
  authenticated: boolean;
  user?: User;
}
