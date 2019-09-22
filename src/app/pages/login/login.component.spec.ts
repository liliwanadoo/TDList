import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('LoginComponent should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a h1 tag define as \'Identifiez-vous\'', () => {
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    // Results of compilation
    const compile = fixture.debugElement.nativeElement;

    // Our finally test
    const tag = compile.querySelector('h1');

    expect(tag.textContent).toBe('Identifiez-vous');
  });

  it('Should have a title attribute', () => {
    const app = fixture.debugElement.componentInstance;

    expect(app.title).toBeTruthy();

  });

  it('Should have a title identified as identifiez-vous', () => {
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    expect(app.title).toBe('Identifiez-vous');
  });

  it('Should have a form tag', () => {
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    const compile = fixture.debugElement.nativeElement;
    const tag = compile.querySelector('form');
    expect(tag).toBeTruthy();
  });

  it('Should have a text typed input defined as login', () => {
  const app = fixture.debugElement.componentInstance;
  fixture.detectChanges();

    // Results of compilation
  const compile = fixture.debugElement.nativeElement;

    // Our finally test
  const tag = compile.querySelectorAll('input');

  expect(tag[0].type).toBe('text');

  expect(tag[0].name).toBe('login');
  });

  it('Should have a password typed input defined as password', () => {
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();

      // Results of compilation
    const compile = fixture.debugElement.nativeElement;

      // Our finally test
    const tag = compile.querySelectorAll('input');

    expect(tag[1].type).toBe('password');

    expect(tag[1].name).toBe('password');
    });

  it('Should have a button typed input defined as signin', () => {
      const app = fixture.debugElement.componentInstance;
      fixture.detectChanges();

        // Results of compilation
      const compile = fixture.debugElement.nativeElement;

        // Our finally test
      const tag = compile.querySelectorAll('button');

      expect(tag[0].type).toBe('button');

      expect(tag[0].name).toBe('signin');
      });

  it('Should have a button typed input defined as signin', () => {
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();

          // Results of compilation
        const compile = fixture.debugElement.nativeElement;

          // Our finally test
        const tag = compile.querySelectorAll('button');

        expect(tag[1].type).toBe('button');

        expect(tag[1].name).toBe('createAccount');
        });

  it('Should have a button typed input defined as signin', () => {
          const app = fixture.debugElement.componentInstance;
          fixture.detectChanges();

            // Results of compilation
          const compile = fixture.debugElement.nativeElement;

            // Our finally test
          const tag = compile.querySelector('a[href^=""]');

          expect(app).toBeTruthy();
          });

});
