type AllowedKeyTypes = string | number;

export class Ioc {
  private singletons = new Map<AllowedKeyTypes, () => any>();
  private overrides = new Map<AllowedKeyTypes, () => any>();
  private builtInstances = new Map<string | number, any>();
  private static readonly ioc: Ioc = new Ioc();

  static get instance() {
    return this.ioc;
  }

  singleton<T>(key: AllowedKeyTypes, factory: () => T): Ioc {
    if (this.singletons.has(key)) {
      throw new Error(`Singleton already registered for key ${key}`);
    }
    this.singletons.set(key, factory);
    return this;
  }

  override(override: Record<AllowedKeyTypes, () => any>): Ioc {
    Object.entries(override).forEach(([key, value]) => {
      this.overrides.set(key, value);
    });
    return this;
  }

  reset() {
    this.builtInstances = new Map();
    this.overrides = new Map();
    this.singletons = new Map();
  }

  provideByKey<T>(key: AllowedKeyTypes): T {
    if (this.builtInstances.has(key)) {
      return this.builtInstances.get(key);
    }
    const factory = this.overrides.has(key) ? this.overrides.get(key) : this.singletons.get(key);
    if (factory == null) {
      throw new Error(`No singleton registered for key ${key}`);
    }
    const builtInstance = factory();
    this.builtInstances.set(key, builtInstance);
    return builtInstance;
  }
}
