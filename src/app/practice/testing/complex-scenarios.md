# 🟥 Testing Complex Scenarios

## Scenario 1: HTTP Testing
```typescript
it('should handle HTTP error', () => {
  service.getData().subscribe({
    error: err => expect(err.status).toBe(500)
  });
  
  const req = httpMock.expectOne('/api/data');
  req.flush('Server error', { status: 500, statusText: 'Error' });
});
```

## Scenario 2: Integration Testing
Test parent-child component interaction.

## Scenario 3: Async Testing
```typescript
it('should load data async', fakeAsync(() => {
  component.loadData();
  tick(1000);  // Simulate time passing
  fixture.detectChanges();
  expect(component.data()).not.toBeNull();
}));
```

## Scenario 4: Form Testing
```typescript
it('should validate form', () => {
  component.form.setValue({ name: '', email: 'invalid' });
  expect(component.form.valid).toBeFalse();
  
  component.form.setValue({ name: 'John', email: 'john@test.com' });
  expect(component.form.valid).toBeTrue();
});
```

## Scenario 5: Router Testing
```typescript
it('should navigate on button click', () => {
  const router = TestBed.inject(Router);
  spyOn(router, 'navigate');
  
  component.goToDetails(1);
  
  expect(router.navigate).toHaveBeenCalledWith(['/details', 1]);
});
```
