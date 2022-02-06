export class LocalStorageService {

  static TOKEN_KEY = 'token';

  public get(key: string, defaultValue: any = null): string
  {
    const result = (sessionStorage.getItem(key) !== null) ? sessionStorage.getItem(key) : localStorage.getItem(key);

    return result !== null ? result : defaultValue;
  }

  public set(key: string, value: string|number, keep: boolean = false)
  {
    if (keep)
    {
      localStorage.setItem(key, String(value));
    }
    else
    {
      sessionStorage.setItem(key, String(value));
    }
    return this;
  }

  public remove(key: string)
  {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);

    return this;
  }
}
