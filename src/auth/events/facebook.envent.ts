import { Profile } from 'passport-facebook';

export class FacebookLoginSuccessEvent {
  profile: Profile;
  constructor(value) {
    this.profile = value;
  }
}
