import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCircleButton } from './icon-circle-button';

describe('IconCircleButton', () => {
  let component: IconCircleButton;
  let fixture: ComponentFixture<IconCircleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconCircleButton],
    }).compileComponents();

    fixture = TestBed.createComponent(IconCircleButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
