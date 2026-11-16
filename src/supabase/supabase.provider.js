import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
export const SUPABASE = 'SUPABASE_CLIENT';
export const SupabaseProvider = {
    provide: SUPABASE,
    inject: [ConfigService],
    useFactory: (config) => createClient(config.getOrThrow('SUPABASE_URL'), config.getOrThrow('SUPABASE_SERVICE_ROLE_KEY')),
};
//# sourceMappingURL=supabase.provider.js.map