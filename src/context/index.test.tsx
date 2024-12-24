import * as Context from './index';
import {
  DataProvider,
  useDataContext,
  Category,
  Profile,
  Status,
  Type,
} from './DataContext';

describe('context/index.ts exports', () => {
  it('exports DataProvider and useDataContext correctly', () => {
    expect(Context.DataProvider).toBe(DataProvider);
    expect(Context.useDataContext).toBe(useDataContext);
  });

  it('exports enums correctly', () => {
    expect(Context.Category).toBe(Category);
    expect(Context.Profile).toBe(Profile);
    expect(Context.Status).toBe(Status);
    expect(Context.Type).toBe(Type);
  });

  it('ensures all executable exports are defined', () => {
    expect(Context.DataProvider).toBeDefined();
    expect(Context.useDataContext).toBeDefined();
    expect(Context.Category).toBeDefined();
    expect(Context.Profile).toBeDefined();
    expect(Context.Status).toBeDefined();
    expect(Context.Type).toBeDefined();
  });
});
