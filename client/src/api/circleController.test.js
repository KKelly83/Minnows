// src/api/circleController.test.js
const { joinCircle } = require('./circleController');

const circleId = 1;
const userId = 1;

// Mock Supabase client
jest.mock('../db/supabase', () => {
    // Define the data for an existing membership
    const existingMembershipData = [{ user_id: userId, circle_id: circleId }];
    return {
        supabase: {
            from: () => ({
                insert: jest.fn().mockReturnValue({
                    single: jest.fn().mockResolvedValue({ data: existingMembershipData })
                }),
                select: jest.fn().mockReturnValue({
                    eq: jest.fn().mockImplementation((column, value) => {
                        if (column === 'circle_id' && value === circleId) {
                            return {
                                eq: jest.fn().mockReturnValue({
                                    data: existingMembershipData // Return existing membership data
                                })
                            };
                        }
                        return {};
                    }),
                })
            })
        }
    };
});
  

describe('joinCircle function', () => {
    it('Should successfully join a circle', async () => {
      const userId = 1;
      const circleId = 1;
      
      await expect(joinCircle({ circleId: circleId, userId: userId })).resolves.toEqual('Joined circle');
    });
  
    it('Should prevent duplicate joining of circle', async () => {
      const userId = 1;
      const circleId = 1;
      
      await expect(joinCircle(circleId, userId)).resolves.toEqual('Already joined this circle');
    });
  });