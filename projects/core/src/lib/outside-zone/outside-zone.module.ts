import { NgModule, ModuleWithProviders, Injector, NgZone } from '@angular/core';

export function RunOutsideAngular(): MethodDecorator {
    return (_target, _key, descriptor: PropertyDescriptor) => {
        const originalValue: Function = descriptor.value;

        descriptor.value = function() {
            const zone: NgZone = OutsideZoneModule.injector!.get(NgZone);

            if (typeof zone.runOutsideAngular === 'function') {
                return zone.runOutsideAngular(originalValue.bind(this, ...arguments));
            }

            return originalValue.apply(this, arguments);
        };

        return descriptor;
    };
}

@NgModule()
export class OutsideZoneModule {
    /**
     * @property {Injector}
     */
    public static injector: Injector | null = null;

    constructor(injector: Injector) {
        OutsideZoneModule.injector = injector;
    }

    /**
     * @returns a wrapper around NgModule
     */
    public static forRoot(): ModuleWithProviders<OutsideZoneModule> {
        return {
            ngModule: OutsideZoneModule
        };
    }
}


