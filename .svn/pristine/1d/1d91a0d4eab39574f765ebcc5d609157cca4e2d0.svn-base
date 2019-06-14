import {Injectable} from '@angular/core';
import {AuthService, AuthServiceConfig, GoogleLoginProvider} from 'angular-6-social-login';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  constructor(private socialAuthService: AuthService, private userSV: UserService) {
  }

  public socialSignIn() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    return this.socialAuthService.signIn(socialPlatformProvider);
  }

  async getUserFromServer() {
    const data = await this.userSV.getUserFromModule().then(el => el).catch(er => er);
    if (data.status !== 401) {
      console.log(data);
      this.userSV.setUser = data;
      return true;
    }
    return false;
  }
}

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('399207453906-p9lmthq0utrjnddcgdacu8ds0gp05df9.apps.googleusercontent.com')
      },
    ]
  );
  return config;
}
