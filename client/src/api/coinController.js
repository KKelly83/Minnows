// coinController.js
import { supabase } from "../db/supabase";

export function subscribeToCoinChanges(userId, handleNewCoinValue) {
    const subscription = supabase
        .from(`users:user_id=eq.${userId}`)
        .on('UPDATE', payload => {
            console.log('Coin data updated:', payload);
            handleNewCoinValue(payload.new.coins);
        })
        .subscribe();

    console.log("Subscription details:", subscription);
    return () => supabase.removeSubscription(subscription);
}
