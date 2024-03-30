import PostItem from "./PostItem";
import { supabase } from '../../db/supabase';

test('Created Post Successfully.' , () => {
    expect(
        PostItem().toEqual(Box)
    ) 
})