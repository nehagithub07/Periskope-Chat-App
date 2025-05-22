"use server"
import { supabase } from "../lib/supabaseClient"
export const createProfile = async (email: string, phone: string, name: string) => {
    try {
        const profile = await supabase.from('profiles').insert({email, name, phone})
        console.log(profile)
    } catch (e){
        console.log(e);
    }
}