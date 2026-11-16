import { Global, Module } from '@nestjs/common';
import { SupabaseProvider, SUPABASE } from './supabase.provider.js';

@Global()
@Module({
  providers: [SupabaseProvider],
  exports: [SUPABASE],
})
export class SupabaseModule {}
