import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectWlanPage } from './connect-wlan.page';

describe('ConnectWlanPage', () => {
  let component: ConnectWlanPage;
  let fixture: ComponentFixture<ConnectWlanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectWlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
