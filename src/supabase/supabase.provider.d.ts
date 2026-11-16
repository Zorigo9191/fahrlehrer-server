import { ConfigService } from '@nestjs/config';
export declare const SUPABASE = "SUPABASE_CLIENT";
export declare const SupabaseProvider: {
    provide: string;
    inject: (typeof ConfigService)[];
    useFactory: (config: ConfigService) => import("@supabase/supabase-js").SupabaseClient<any, "public", "public", any, any>;
};
