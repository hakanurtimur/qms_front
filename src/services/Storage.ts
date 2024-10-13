class Storage {
  static localRetrieve(key: string): string | null {
    return localStorage.getItem(key);
  }

  static localStore(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static localClear(key: string): void {
    localStorage.removeItem(key);
  }

  static localAllClear(excludeKey: string = "channelKey"): void {
    const temp = localStorage.getItem(excludeKey);
    localStorage.clear();
    if (temp) {
      localStorage.setItem(excludeKey, temp);
    }
  }
}

export default Storage;
