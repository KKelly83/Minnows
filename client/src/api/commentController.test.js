// src/api/postController.test.js
const { submitComment } = require('./commentController');

// Mock the supabase module
jest.mock('../db/supabase', () => ({
  supabase: {
    from: () => ({
      insert: jest.fn().mockReturnValue({
        single: jest.fn().mockResolvedValue({ data: [{ body: 'Test body' }] })
      }),
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({}),
      })
    })
  }
}));

describe('submitComment function', () => {
  it('Should successfully create a comment', async () => {
    const content = 'Content';
    
    await expect(submitComment({ content: content })).resolves.toEqual('Comment created successfully.');
  });

  it('should throw an error if content is too long', async () => {
    const longContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
    
    await expect(submitComment({ content: longContent })).rejects.toThrow();
  });

  it('should throw an error if content is empty', async () => {
    const emptyContent = '';
    
    await expect(submitComment({ content: emptyContent })).rejects.toThrow();
  });

});
