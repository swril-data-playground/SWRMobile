import type { Constructor } from '/home/narukirito/SWRMobileAries/src/wallet/utils/mixins'
import type { Module } from './Module'
import type { DependencyContainer } from 'tsyringe'

import { container as rootContainer, InjectionToken, Lifecycle } from 'tsyringe'

export { InjectionToken }

export class DependencyManager {
  public readonly container: DependencyContainer

  public constructor(container: DependencyContainer = rootContainer.createChildContainer()) {
    this.container = container
  }

  public registerModules(...modules: Module[]) {
    modules.forEach((module) => module.register(this))
  }

  public registerSingleton<T>(from: InjectionToken<T>, to: InjectionToken<T>): void
  public registerSingleton<T>(token: Constructor<T>): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerSingleton<T = any>(fromOrToken: InjectionToken<T> | Constructor<T>, to?: any) {
    this.container.registerSingleton(fromOrToken, to)
  }

  public resolve<T>(token: InjectionToken<T>): T {
    return this.container.resolve(token)
  }

  public registerInstance<T>(token: InjectionToken<T>, instance: T) {
    this.container.registerInstance(token, instance)
  }

  public isRegistered<T>(token: InjectionToken<T>): boolean {
    return this.container.isRegistered(token)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerContextScoped<T = any>(token: Constructor<T>): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerContextScoped<T = any>(token: InjectionToken<T>, provider: Constructor<T>): void

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public registerContextScoped(token: any, provider?: any) {
    if (provider) this.container.register(token, provider, { lifecycle: Lifecycle.ContainerScoped })
    else this.container.register(token, token, { lifecycle: Lifecycle.ContainerScoped })
  }

  public createChild() {
    return new DependencyManager(this.container.createChildContainer())
  }
}
