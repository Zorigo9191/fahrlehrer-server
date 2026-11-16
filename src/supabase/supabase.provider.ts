import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

export const SUPABASE = 'SUPABASE_CLIENT';

export const SupabaseProvider = {
  provide: SUPABASE,
  inject: [ConfigService],
  useFactory: (config: ConfigService) =>
    createClient(
      config.getOrThrow<string>('SUPABASE_URL'),
      config.getOrThrow<string>('SUPABASE_SERVICE_ROLE_KEY'),
    ),
};
