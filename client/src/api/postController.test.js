// src/api/postController.test.js
const { submitPost } = require('./postController');

// Mock the supabase module
jest.mock('../db/supabase', () => ({
  supabase: {
    from: () => ({
      insert: jest.fn().mockReturnValue({
        single: jest.fn().mockResolvedValue({ data: [{ title: 'Test title', body: 'Test body' }] })
      }),
      select: jest.fn().mockReturnValue({
        
      })
    })
  }
}));

describe('submitPost function', () => {
  it('Should successfully create a post', async () => {
    const title = 'Title';
    const content = 'Body';
    
    await expect(submitPost({ title: title, content: content })).resolves.toEqual('Post created successfully.');
  });

  it('should throw an error if content is too long', async () => {
    const title = 'Title';
    const longContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
    
    await expect(submitPost({ title: title, content: longContent })).rejects.toThrow();
  });

  it('should throw an error if title is longer than 30 characters', async () => {
    const longTitle = 'asdfgh asdfgh asdfgh asdfgh asdfghg asda sdasdas';
    const content = 'Body';
    
    await expect(submitPost({ title: longTitle, content: content })).rejects.toThrow();
  });

  it('should throw an error if title is empty', async () => {
    const title = '';
    const content = 'Body';
    
    await expect(submitPost({ title: title, content: content })).rejects.toThrow();
  });

  it('should throw an error if body is empty', async () => {
    const title = 'Title';
    const content = '';
    
    await expect(submitPost({ title: title, content: content })).rejects.toThrow();
  });

});
