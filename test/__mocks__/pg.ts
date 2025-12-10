const mockQuery = jest.fn();

class MockPool {
  query = mockQuery;
  connect = jest.fn();
  end = jest.fn();
}

export { MockPool };
export const __mockQuery = mockQuery;