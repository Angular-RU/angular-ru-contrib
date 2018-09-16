import { Component, OnInit, NgZone, Compiler, Injector, INJECTOR, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { OutsideZoneModule, RunOutsideAngular } from './outside-zone.module';

@Component({
    selector: 'core-mock',
    template: `
        <div class="div"></div>
        <button (click)="runInterval()">Click me</button>
    `
})
class MockComponent implements OnInit {
    private node: HTMLDivElement | null = null;

    public ngOnInit(): void {
        this.node = document.querySelector('.div');
        Object.assign(this.node!.style, {
            width: '300px',
            height: '4px',
            backgroundColor: 'red'
        });
    }

    @RunOutsideAngular()
    public runInterval(): boolean {
        setInterval(() => {
            this.node!.style.height = `${parseInt(this.node!.style.height, 10) + 1}px`;
        }, 1000);

        return NgZone.isInAngularZone();
    }
}

@NgModule({
    declarations: [
        MockComponent
    ]
})
class MockModule {}

describe('OutsideZoneModule', () => {
    it('`OutsideZoneModule` should be defined', () => {
        expect(OutsideZoneModule).toBeTruthy();
    });

    it('static property `injector` should be defined after instantiating', () => {
        const compiler: Compiler = TestBed.get(Compiler);
        const injector: Injector = TestBed.get(INJECTOR);
        compiler.compileModuleSync(OutsideZoneModule).create(injector);

        expect(OutsideZoneModule.injector !== null).toBeTruthy();
        expect(OutsideZoneModule.injector!.constructor.name).toBe('NgModuleRef_');
    });

    it('should run `setInterval` outside angular zone', () => {
        TestBed.configureTestingModule({
            imports: [
                OutsideZoneModule.forRoot()
            ],
            declarations: [
                MockComponent
            ]
        }).compileComponents();

        const fixture: ComponentFixture<MockComponent> = TestBed.createComponent(MockComponent);
        const isInAngularZone: boolean = fixture.componentInstance.runInterval();
        expect(isInAngularZone).toBeFalsy();
    });

    it('decorator should be available to use in another module that is imported by the root module', () => {
        TestBed.configureTestingModule({
            imports: [
                OutsideZoneModule.forRoot(),
                MockModule
            ]
        }).compileComponents();

        const fixture: ComponentFixture<MockComponent> = TestBed.createComponent(MockComponent);
        const isInAngularZone: boolean = fixture.componentInstance.runInterval();
        expect(isInAngularZone).toBeFalsy();
    });
});
